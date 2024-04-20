import React, {useState} from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Profile.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../services/actions';
import { PreLoader } from '../../components/pre-loader/PreLoader';
import { ErrorRequestHandler } from '../../components/ErrorRequestHadler'

function ProfileMenu() {

    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    const logOut = (e) => {
        e.preventDefault();

        dispatch(logout())
        .catch(err => {
          setErrorMessage(err?.message)
        });
    }

       const {isRequest} = useSelector(store => store.user);

    if (isRequest) {
      return <PreLoader />
    }

    return (
        <div className={styles.profile_main_content}>
            <div className={styles.menu}>
                <NavLink to='' end className={({ isActive }) => isActive ? styles.text_active : styles.text_inactive}>
                    <p className="text text text_type_main-default pb-5">Профиль</p>
                </NavLink>
                <NavLink to='orders' className={({ isActive }) => isActive ? styles.text_active : styles.text_inactive}>
                    <p className="text text_type_main-default pb-5">История заказов</p>
                </NavLink>
                <NavLink className={styles.text_inactive} onClick={(e) => {logOut(e);}}>
                    <p className="text text_type_main-default" >Выход</p>
                </NavLink>

                <ErrorRequestHandler errorMessage={errorMessage}/>

                <p className={`${styles.description} text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <Outlet />
        </div>
    )
}

export default ProfileMenu;