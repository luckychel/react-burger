import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'
import styles from './App.module.css';

import data from '../../utils/data';

function App() {

  const tabs = [
    { name: "Булки", type: 'bun' },
    { name: "Соусы", type: 'sauce' },
    { name: "Начинки", type: 'main' }
  ]

  return (
   
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.main_content}>
        <BurgerIngredients tabs={tabs} data={data} />
        <BurgerConstructor data={data} />
      </div>
  
    </div>
  );
}

export default App;
