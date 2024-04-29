import React, {useState } from 'react'
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Profile.module.css';
import { useSelector, useDispatch } from 'react-redux'
import { changeUser } from '../../services/actions';
import { PreLoader } from '../../components/pre-loader/PreLoader';
import { ErrorRequestHandler } from '../../components/ErrorRequestHadler'

function Profile() {

   const { isRequest, user } = useSelector(store => store.user);
   const [initialFormData] = useState(user);
   const [isEditing, setIsEditing] = useState(false);

   const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

   const dispatch = useDispatch();

   const onChangeFormData = (e) => {
       setIsEditing(true);
       setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
      setErrorMessage('');
    }

    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(changeUser(formData))
        .catch(err => {
          //debugger
          setErrorMessage(err?.message);
          console.log(err?.message)
        });
    }
    
    const cancelEdit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        setFormData(initialFormData);
        setErrorMessage('');
    }

    if (isRequest) {
      return <PreLoader />
    }

    return (
        <div className={styles.outlet_main_content}>
          <form className={styles.form} onSubmit={onSubmit}>
            <Input type='text' placeholder={'Имя'} onChange={onChangeFormData} value={formData.name} name='name' extraClass="mb-6" />
            <EmailInput placeholder="Логин" onChange={onChangeFormData} value={formData.email} name='email' extraClass="mb-6"  />
            <PasswordInput placeholder="Пароль" onChange={onChangeFormData} value={formData.password } name='password' extraClass="mb-6" />

            <div className={styles.other_content}>
                <Button htmlType="button" type="secondary" extraClass="mb-20" size="medium" onClick={cancelEdit} disabled={!isEditing}>Отмена</Button>
                <Button htmlType="submit" type="primary" extraClass="mb-20" size="medium" disabled={!isEditing}>Сохранить</Button>
            </div>
          </form>

          <ErrorRequestHandler errorMessage={errorMessage}/>
        </div>
    )
}

export default Profile;