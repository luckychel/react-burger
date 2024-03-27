import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

import AppHeader from '../app-header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'
import ErrorBoundary from '../error-boundary/ErrorBoundary';

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
    <ErrorBoundary>
      <div className={styles.app}>
        <AppHeader />
        <div className={styles.main_content}>
          <BurgerIngredients tabs={tabs} ingredients={ingredientsData} />
          <BurgerConstructor ingredients={ingredientsData} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
