import React, { useCallback } from 'react'
import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, NavLink } from 'react-router-dom';

function AppHeader(props) {

  const smartLink = useCallback((to, title) => {
    return (
      <NavLink to={to} className={`${styles.nav_link}`}>
      {({ isActive }) => (
        <>
          { to ==='/' && <BurgerIcon type={`${isActive ? 'primary' : 'secondary'}`} /> }
          { to ==='/orderfeed' && <ListIcon type={`${isActive ? 'primary' : 'secondary'}`} /> }
          { to ==='/profile' && <ProfileIcon  type={`${isActive ? 'primary' : 'secondary'}`} /> }
          <span className={`text text_type_main-small ${isActive ? styles.text_active : styles.text_inactive}`}>{title}</span>
        </>
      )}
      </NavLink>
    )
  }, [])

  return (
        <header className={`${styles.main_content} mt-5 mr-5 ml-5`}>
            {smartLink('/', 'Конструктор')}
            {smartLink('/orderfeed', 'Лента заказов')}

            <Link to='/' className={styles.logo}>
              <Logo />  
            </Link>

            {smartLink('/profile', 'Личный кабинет')}
        </header>
      );
    }

  export default AppHeader;