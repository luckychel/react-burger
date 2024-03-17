import React from 'react'
import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader(props) {

  return (
        <header className={`${styles.main_content} mt-5 mr-5 ml-5`}>

          <div className={styles.nav_link} >
            <BurgerIcon type="primary"/>
            <p className={`text text_type_main-small ${styles.text_active}`}>Конструктор</p>
          </div>

          <div className={styles.nav_link}> 
            <ListIcon type="secondary"/>
            <p className={`text text_type_main-small ${styles.text_inactive}`}>Лента заказов</p>
          </div>

          <div className={styles.logo}>
            <Logo />  
          </div>

          <div className={styles.nav_link}>
            <ProfileIcon type="secondary"/>
            <p className={`text text_type_main-small ${styles.text_inactive}`}>Личный кабинет</p>
          </div>

        </header>
      );
    }

  export default AppHeader;