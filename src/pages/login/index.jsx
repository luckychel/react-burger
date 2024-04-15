import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });

    const onChangeFormData = (e) => {
       setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }

    const onSubmitFormLogin = (e) => {
        e.preventDefault();
    }

  return (
    <div className={styles.main_content}>
      <h1 className={`${styles.title} text_type_main-medium mb-6`}>Вход</h1>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmitFormLogin}>
        <EmailInput placeholder={'E-mail'} value={formData.email} name={'email'} onChange={onChangeFormData} />
        <PasswordInput placeholder={'Пароль'} value={formData.password} name={'password'} onChange={onChangeFormData} />
        <Button type="primary" size="medium">Войти</Button>
      </form>
      <div className={`${styles.other_links} mb-4`}>
        <span className="text_type_main-default">Вы — новый пользователь?</span>
        <Link to="/register" className={`${styles.link} ml-2 text_type_main-default`}>Зарегистироваться</Link>
      </div>
      <div className={styles.other_links}>
        <span className="text_type_main-default">Забыли пароль?</span>
        <Link to="/forgot-password" className={`${styles.link} ml-2 text_type_main-default`}>Восстановить пароль</Link>
      </div>
    </div>

  );
}
export default Login;