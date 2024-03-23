import React, {useState, useRef, useEffect, useCallback} from 'react'
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { BurgerIngridientsType } from '../../utils/propTypes'

import BurgerIngredientItem from '../burger-ingredient-item/BurgerIngredientItem';

function BurgerIngredients({tabs, ingredients}) {

    const [current, setCurrent] = useState(tabs[0].type);

    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const tabClickHandler = (clickedTab) => {

      switch (clickedTab) {
        case 'bun': bunRef.current.scrollIntoView({ behavior: "smooth" }); break;
        case 'sauce': sauceRef.current.scrollIntoView({ behavior: "smooth" }); break;
        case 'main': mainRef.current.scrollIntoView({ behavior: "smooth" }); break;
        default: bunRef.current.scrollIntoView({ behavior: "smooth" });
      }

      setCurrent(clickedTab);

    };

    return (

      <section className={styles.ingredient_main_content}>

        <p className={`text_type_main-large mt-10 mb-0`}>Соберите бургер</p>

        <div className={`${styles.tabs} mt-5`}>
        { 
          tabs.map((tab) => (
            <Tab value={tab.type} key={tab.name} active={current === tab.type} onClick={tabClickHandler}>
              {tab.name}
            </Tab>
          ))
        }
        </div>

        <div className={`${styles.ingredients} mt-10`}>
        {
          ingredients && (
            tabs.map((tab) => {

              const refer = tab.type === 'bun' ? bunRef : tab.type === 'sauce' ? sauceRef:  mainRef;

              return (
                <div key={tab.type}>
                  <p key={tab.type} className="text text_type_main-medium" ref={refer}>{tab.name}</p>
                  <div className={styles.details}>
                  {
                    ingredients.filter(item => item.type === tab.type)
                      .map((item) => 
                        <BurgerIngredientItem key={item._id} {...item} />
                      )
                  }
                  </div>
                </div>
              )
            })
          )
        }
        
      </div>
    </section>
    )
}

BurgerIngredients.propTypes = BurgerIngridientsType;




export default BurgerIngredients;