
import React, {useState} from 'react';
import styles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { Link } from 'react-router-dom';

function ResetPassword() {

    const [formData, setFormData] = useState({
        password: '',
        secretCode: '',
      });

    const onChangeFormData = (e) => {
       setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }
   
    return (
        <div className={styles.reset_main_content}>
        <h1 className={`${styles.title} text_type_main-medium mb-6`}>Восстановление пароля</h1>
        <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
            <PasswordInput placeholder={'Пароль'} value={formData.password} name={'password'} onChange={onChangeFormData} extraClass="mb-6"/>
            <Input type='text' placeholder={'Введите код из письма'} value={formData.secretCode}  onChange={onChangeFormData} name='secretCode' extraClass="mb-6" />
            <Button type="primary" size="medium">
                Сохранить
            </Button>
        </form>
        <div className={styles.other_content}>
            <span className="text_type_main-default">Вспомнили пароль?</span>
            <Link to="/login" className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
            </div>
        </div>

    )
}

export default ResetPassword;