import React from 'react'
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import BurgerIngredientItem from '../burger-ingredient-item/BurgerIngredientItem';

function BurgerIngredients(props) {
    
    const ingredients = props.data;

    const tabs = [
      { name: "Булки", type: 'bun' },
      { name: "Соусы", type: 'sauce' },
      { name: "Начинки", type: 'main' }
    ];
    const [current, setCurrent] = React.useState(tabs[0].type);

    return (

      <section className={styles.ingredient_main_content}>

        <p className={`text_type_main-large mt-10 mb-0`}>Соберите бургер</p>

        <div className={`${styles.tabs} mt-5`}>
          { 
            tabs.map((tab) => (
              <Tab value={tab.type} key={tab.name} active={current === tab.type} onClick={setCurrent}>
              {tab.name}
              </Tab>
            ))
          }
        </div>

        <div className={styles.ingredients}>
        {
          ingredients && (
            <>
              {
                tabs.map((tab) => (
                  <div key={tab.name}>
                    <p className="text text_type_main-medium mt-10">{tab.name}</p>
                    <div className={styles.details}>
                      {
                        ingredients.filter(item => item.type === tab.type)
                          .map((item) => 
                            <BurgerIngredientItem key={item._id} {...item} />
                          )
                      }
                    </div>
                  </div>
                ))
              }
            </>
          )
        }
      </div>
    </section>
    )
}

export default BurgerIngredients;