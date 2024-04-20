
import React, {useState} from 'react';
import styles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../../services/actions';
import { PreLoader } from '../../components/pre-loader/PreLoader';
import { ErrorRequestHandler } from '../../components/ErrorRequestHadler'

function ResetPassword() {

    const [formData, setFormData] = useState({
        password: '',
        token: '',
      });

    const onChangeFormData = (e) => {
       setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        
        dispatch(resetPassword(formData))
        .then(result => {
            if (result && result.success) {
               navigate('/login');
            }
        })
        .catch(err => {
            setErrorMessage(err?.message)
        });
    }

    const {isRequest} = useSelector(store => store.user);

    const location = useLocation();

    if (!location.state || (location.state && location.state.from?.pathname !== '/forgot-password')) {
        return (
            <Navigate to={"/forgot-password"}/>
        );
    }

    if (isRequest) {
      return <PreLoader />
    }

    return (
        <div className={styles.reset_main_content}>
        <h1 className={`${styles.title} text_type_main-medium mb-6`}>Восстановление пароля</h1>
        <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
            <PasswordInput placeholder={'Пароль'} value={formData.password} name={'password'} onChange={onChangeFormData} extraClass="mb-6"/>
            <Input type='text' placeholder={'Введите код из письма'} value={formData.token} onChange={onChangeFormData} name='token' extraClass="mb-6" />
            <Button htmlType='submit' type="primary" size="medium">Сохранить</Button>
        </form>

        <ErrorRequestHandler errorMessage={errorMessage}/>

        <div className={styles.other_content}>
            <span className="text_type_main-default">Вспомнили пароль?</span>
            <Link to="/login" className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
            </div>
        </div>
    )
}

export default ResetPassword;