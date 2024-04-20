import React, {useState} from 'react'
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../services/actions';
import { PreLoader } from '../../components/pre-loader/PreLoader';
import { ErrorRequestHandler } from '../../components/ErrorRequestHadler'

function Register() {

    const [formData, setFormData] = useState({
      email: '',
      password: '',
      name: ''
     });

    const onChangeFormData = (e) => {
       setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (e) => {
      e.preventDefault();
      dispatch(register(formData))
        .catch(err => {
          setErrorMessage(err?.message)
        });
    }
    const {isRequest} = useSelector(store => store.user);

    if (isRequest) {
      return <PreLoader />
    }

    return (

        <div className={styles.register_main_content}>
          <h1 className={`${styles.title} text_type_main-medium mb-6`}>Регистрация</h1>
          <form className={styles.form} onSubmit={onSubmit}>
            <Input type='text' placeholder={'Имя'} onChange={onChangeFormData} value={formData.name} name='name' extraClass="mb-6" />
            <EmailInput placeholder="Логин" onChange={onChangeFormData} value={formData.email} name='email' extraClass="mb-6"  />
            <PasswordInput placeholder="Пароль" onChange={onChangeFormData} value={formData.password} name='password' extraClass="mb-6" />

            <Button htmlType="submit" type="primary" extraClass="mb-20" size="medium">Зарегистироваться</Button>
            
          </form>
          <ErrorRequestHandler errorMessage={errorMessage}/>

          <div className={styles.other_content}>
            <span className="text_type_main-default">Уже зарегистированы?</span>
            <Link to="/login" className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
          </div>
        </div>

    )
}

export default Register;