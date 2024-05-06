import {useState, FC, FormEvent, ChangeEvent} from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../services/actions';
import { PreLoader } from '../../components/pre-loader/PreLoader';

import { ErrorRequestHandler } from '../../components/ErrorRequestHadler'

const Login: FC = () => {

    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const onChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
       setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    }

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      //@ts-ignore
      dispatch(login(formData))
        .catch((err: Error) => {
          setErrorMessage(err?.message)
        });
    }

    const { state } = useLocation();

    const {isRequest, user} = useSelector((store: any) => store.user);

    if (isRequest) {
      return <PreLoader />
    }

    if (user) {
        return (
         (state?.from?.pathname === "/") ?
          <Navigate to={"/"}/>
          : 
          <Navigate to={"/profile"}/>
        );
    }

  return (
    <div className={styles.login_main_content}>
      <h1 className={`${styles.title} text_type_main-medium mb-6`}>Вход</h1>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
        <EmailInput placeholder={'E-mail'} value={formData.email} name={'email'} onChange={onChangeFormData} />
        <PasswordInput placeholder={'Пароль'} value={formData.password || ''} name={'password'} onChange={onChangeFormData} />
        <Button htmlType="submit" type="primary" size="medium">Войти</Button>
      </form>

      <ErrorRequestHandler errorMessage={errorMessage}/>

      <div className={`${styles.other_content} mb-4`}>
        <span className="text_type_main-default">Вы — новый пользователь?</span>
        <Link to="/register" className={`${styles.link} ml-2 text_type_main-default`}>Зарегистироваться</Link>
      </div>
      <div className={styles.other_content}>
        <span className="text_type_main-default">Забыли пароль?</span>
        <Link to="/forgot-password" className={`${styles.link} ml-2 text_type_main-default`}>Восстановить пароль</Link>
      </div>
    </div>
  );
}
export default Login;