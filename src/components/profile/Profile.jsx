import React, {useState} from 'react'
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Profile.module.css';

function Profile() {

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
    
    const cancelEdit = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.outlet_main_content}>
          <form className={styles.form} onSubmit={onSubmit}>
                <Input type='text' placeholder={'Имя'} onChange={onChangeFormData} value={formData.username} name='username' extraClass="mb-6" />
                <EmailInput placeholder="Логин" onChange={onChangeFormData} value={formData.email} name='email' extraClass="mb-6"  />
                <PasswordInput placeholder="Пароль" onChange={onChangeFormData} value={formData.password} name='password' extraClass="mb-6" />

                <div className={styles.other_content}>
                    <Button htmlType="button" type="secondary" extraClass="mb-20" size="medium" onClick={cancelEdit}>Отмена</Button>
                    <Button htmlType="submit" type="primary" extraClass="mb-20" size="medium">Сохранить</Button>
                </div>
                
            </form>
        </div>
    )
}

export default Profile;