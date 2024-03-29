import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

import AppHeader from '../app-header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'
import ErrorBoundary from '../error-boundary/ErrorBoundary';

import { IngredientsContext } from '../../services/appContext'

import { request } from '../../utils/api';

function App() {

  const [ingredientsData, setIngredientsData] = useState(null);

  useEffect(() => {
    request('ingredients', {})
      .then(data => { 
        setIngredientsData(data.data)
      })
      .catch(e => {
        console.error('Error: ' + e.message);
      });
  }, []);

  const tabs = [
    { name: "Булки", type: 'bun' },
    { name: "Соусы", type: 'sauce' },
    { name: "Начинки", type: 'main' }
  ]

  return (
    <ErrorBoundary>
      <main className={styles.app}>
        <AppHeader />
        <IngredientsContext.Provider value={ingredientsData}>
        <div className={styles.main_content}>
            <BurgerIngredients tabs={tabs} />
            <BurgerConstructor />
        </div>
        </IngredientsContext.Provider>
      </main>
    </ErrorBoundary>
  );
}

export default App;
