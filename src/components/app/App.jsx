import React, { useEffect } from 'react';
import styles from './App.module.css';

import AppHeader from '../app-header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'
import ErrorBoundary from '../error-boundary/ErrorBoundary';

import { getIngredients } from '../../services/actions';
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
        <DndProvider backend={HTML5Backend}>
          <main className={styles.app}>
              <div className={styles.main_content}>
                  <BurgerIngredients />
                  <BurgerConstructor />
              </div>
          </main>
        </DndProvider>
    </ErrorBoundary>
  );
}

export default App;
