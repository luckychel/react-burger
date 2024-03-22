import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'
import styles from './App.module.css';

//import ingredientsData from '../../utils/data';

const api = 'https://norma.nomoreparties.space/api/';

function App() {

  const [ingredientsData, setIngredientsData] = useState();

  useEffect(() => {
    fetch(api + 'ingredients')
        .then(res => {
          if (!res.ok) 
          {
            return Promise.reject(`Ошибка ${res.status}`);
          }
          return res.json();
        })
        .then(data => { 
          setIngredientsData(data.data)
        })
        .catch(e => {
          console.log('Error: ' + e.message);
        });
  }, []);

  const tabs = [
    { name: "Булки", type: 'bun' },
    { name: "Соусы", type: 'sauce' },
    { name: "Начинки", type: 'main' }
  ]

  /*
  const [error, setError] = useState(null);
  const handleClick = () => {
    try {
      throw new Error("Simple error");
    } catch (err) {
      // Обычно ошибки логируются или обрабатываются дополнительной логикой,
      // но для наглядности мы просто кладём ошибку в стейт
      setError(err.message);
    }
  };

  <button onClick={handleClick}>Make a mistake</button>
*/

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
