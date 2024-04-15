import React, {useState} from 'react'
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css';
import { Link } from 'react-router-dom';

function Register() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
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
        <div className={styles.register_main_content}>
          <h1 className={`${styles.title} text_type_main-medium mb-6`}>Регистрация</h1>
          <form className={styles.form} onSubmit={onSubmit}>
            <Input type='text' placeholder={'Имя'} onChange={onChangeFormData} value={formData.username} name='username' extraClass="mb-6" />
            <EmailInput placeholder="Логин" onChange={onChangeFormData} value={formData.email} name='email' extraClass="mb-6"  />
            <PasswordInput placeholder="Пароль" onChange={onChangeFormData} value={formData.password} name='password' extraClass="mb-6" />

            <Button htmlType="submit" type="primary" extraClass="mb-20" size="medium">Зарегистироваться</Button>
            
          </form>
          <div className={styles.other_content}>
            <span className="text_type_main-default">Уже зарегистированы?</span>
            <Link to="/login" className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
          </div>
        </div>
    )
}

export default Register;