import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'
import styles from './App.module.css';

//import ingredientsData from '../../utils/data';

import { getData } from '../../utils/api';

function App() {

  const [ingredientsData, setIngredientsData] = useState();

  useEffect(() => {
    getData('ingredients')
      .then(data => { 
        setIngredientsData(data.data)
      })
  }, []);

  const tabs = [
    { name: "Булки", type: 'bun' },
    { name: "Соусы", type: 'sauce' },
    { name: "Начинки", type: 'main' }
  ]

  return (
   
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.main_content}>
        <BurgerIngredients tabs={tabs} ingredients={ingredientsData} />
        <BurgerConstructor ingredients={ingredientsData} />
      </div>
  
    </div>
  );
}

export default App;
