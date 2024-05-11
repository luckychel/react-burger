import {useState, FC, FormEvent, ChangeEvent} from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { forgotPassword } from '../../services/actions';
import { PreLoader } from '../../components/pre-loader/PreLoader';
import { ErrorRequestHandler } from '../../components/ErrorRequestHadler'

import { useAppSelector, useAppDispatch } from '../../services/hooks';

const ForgotPassword: FC = () => {

  const [formData, setFormData] = useState({
    email: ''
  });

  const onChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    dispatch(forgotPassword(formData))
      .then(result => {
        if (result && result.success) {
          navigate('/reset-password', { state: {from: location}});
        }
      })
      .catch((err: Error) => {
        setErrorMessage(err.message)
      });
  }

  const {isRequest} = useAppSelector(store => store.user);

  if (isRequest) {
    return <PreLoader />
  }

  return (
    <div className={styles.forgot_main_content}>
      <h1 className={`${styles.title} text_type_main-medium mb-6`}>Восстановление пароля</h1>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
        <EmailInput onChange={onChangeFormData} value={formData.email} name={'email'} placeholder='E-mail' extraClass="mb-6" />
        <Button htmlType='submit' type="primary" size="medium">Восстановить</Button>
      </form>
      
      <ErrorRequestHandler errorMessage={errorMessage}/>

      <div className={styles.other_links}>
        <span className="text_type_main-default">Вспомнили пароль?</span>
        <Link to="/login" className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;