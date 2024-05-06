import {useState, FC, ChangeEvent, FormEvent, SyntheticEvent } from 'react'
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Profile.module.css';
import { useSelector, useDispatch } from 'react-redux'
import { changeUser } from '../../services/actions';
import { PreLoader } from '../pre-loader/PreLoader';
import { ErrorRequestHandler } from '../ErrorRequestHadler'

import { TUser } from '../../utils/types';

const Profile: FC = () => {

   const { isRequest, user } = useSelector((store: any) => store.user);
   const [initialFormData] = useState<TUser>(user);
   const [isEditing, setIsEditing] = useState(false);

   const [formData, setFormData] = useState<TUser>({
    name: user.name,
    email: user.email,
    password: ''
  });

   const dispatch = useDispatch();

   const onChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
       setIsEditing(true);
       setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
      setErrorMessage('');
    }

    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

       //@ts-ignore
        dispatch(changeUser(formData))
        .catch((err: Error) => {
          //debugger
          setErrorMessage(err.message);
          //console.log(err.message)
        });
    }
    
    const cancelEdit = (event: SyntheticEvent) => {
        event.preventDefault();

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
            <Input type='text' placeholder={'Имя'} onChange={onChangeFormData} value={formData.name} name='name' extraClass="mb-6" onPointerEnterCapture onPointerLeaveCapture />
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