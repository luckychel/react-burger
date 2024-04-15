import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Profile.module.css';

function ProfileMenu() {

    const logOut = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.profile_main_content}>
            <div className={styles.menu}>
                <NavLink to='' className={({ isActive }) => isActive ? styles.text_active : styles.text_inactive}>
                    <p className="text text text_type_main-default pb-5">Профиль</p>
                </NavLink>
                <NavLink to='orders' className={({ isActive }) => isActive ? styles.text_active : styles.text_inactive}>
                    <p className="text text_type_main-default pb-5">История заказов</p>
                </NavLink>
                <NavLink className={styles.text_inactive} onClick={(e) => {logOut(e);}}>
                    <p className="text text_type_main-default" >Выход</p>
                </NavLink>
                <p className={`${styles.description} text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <Outlet />
        </div>
    )
}

export default ProfileMenu;