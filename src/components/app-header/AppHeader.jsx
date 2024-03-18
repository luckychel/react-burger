import React from 'react'
import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader(props) {

  return (
        <header className={`${styles.main_content} mt-5 mr-5 ml-5`}>

            <a href="#" className={styles.nav_link}>
              <BurgerIcon type="primary"/>
              <span className={`text text_type_main-small ${styles.text_active}`}>Конструктор</span>
            </a>

            <a href="#" className={styles.nav_link}>
              <ListIcon type="secondary"/>
              <span className={`text text_type_main-small ${styles.text_inactive}`}>Лента заказов</span>
            </a>

            <a href="#" className={styles.logo}>
              <Logo />  
            </a>

            <a href="#" className={styles.nav_link}>
              <ProfileIcon type="secondary"/>
              <span className={`text text_type_main-small ${styles.text_inactive}`}>Личный кабинет</span>
            </a>

        </header>
      );
    }

  export default AppHeader;