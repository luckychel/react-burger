import {useState, FC, MouseEvent } from 'react'
import { NavLink, Outlet, useLocation, useMatch } from 'react-router-dom';
import styles from './Profile.module.css';

import { logout } from '../../services/actions';
import { PreLoader } from '../pre-loader/PreLoader';
import { ErrorRequestHandler } from '../ErrorRequestHadler'

import { useAppSelector, useAppDispatch } from '../../services/hooks';

const ProfileMenu: FC = () => {

    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useAppDispatch();

    const logOut = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        dispatch(logout())
        .catch((err: Error) => {
          setErrorMessage(err?.message)
        });
    }

    const {isRequest} = useAppSelector(store => store.user);

    const matchOrder = useMatch('/profile/orders/:number');
    const number = matchOrder?.params.number;

    if (isRequest) {
      return <PreLoader />
    }

    return (
        <div className={styles.profile_main_content}>
            {!number && 
                <div className={styles.menu}>
                    <NavLink to='' end className={({ isActive }) => isActive ? styles.text_active : styles.text_inactive}>
                        <p className="text text text_type_main-default pb-5">Профиль</p>
                    </NavLink>
                    <NavLink to='orders' className={({ isActive }) => isActive ? styles.text_active : styles.text_inactive}>
                        <p className="text text_type_main-default pb-5">История заказов</p>
                    </NavLink>
                    <NavLink to='' className={styles.text_inactive} onClick={(e) => {logOut(e);}}>
                        <p className="text text_type_main-default" >Выход</p>
                    </NavLink>

                    <ErrorRequestHandler errorMessage={errorMessage}/>

                    <p className={`${styles.description} text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
                </div>
            }
            <Outlet />
        </div>
    )
}

export default ProfileMenu;