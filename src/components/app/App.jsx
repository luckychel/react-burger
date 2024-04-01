import React, { useEffect } from 'react';
import styles from './App.module.css';

import AppHeader from '../app-header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'
import ErrorBoundary from '../error-boundary/ErrorBoundary';

import { getIngredients } from '../../services/actions';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <ErrorBoundary>
        <header className={styles.header}>
          <AppHeader />
        </header>
        <main className={styles.app}>
            <div className={styles.main_content}>
                <BurgerIngredients />
                <BurgerConstructor />
            </div>
        </main>
    </ErrorBoundary>
  );
}

export default App;
