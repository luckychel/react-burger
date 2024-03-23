import React, {useState, useEffect, useCallback} from 'react'
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { BurgerIngridientsType } from '../../utils/propTypes'

import BurgerIngredientItem from '../burger-ingredient-item/BurgerIngredientItem';

function BurgerIngredients({tabs, ingredients}) {

    const [current, setCurrent] = useState(tabs[0].type);

    const [tabsRefOffSetTop, setTabsRefOffSetTop] = useState(0);
    const scrollRef = React.useRef(0);
    const bunRef = React.useRef(null);
    const sauceRef = React.useRef(null);
    const mainRef = React.useRef(null);

    useEffect(() => { 
      setTabsRefOffSetTop(scrollRef.current.offsetTop) 
    }, [scrollRef])

    const tabClickHandler = useCallback((clickedTab) => {
       
      let top = 0;

      switch (clickedTab) {
        case 'bun': top = 0; break;
        case 'sauce': top = Math.abs(tabsRefOffSetTop - sauceRef.current.offsetTop)-10; break;
        case 'main': top = Math.abs(tabsRefOffSetTop - mainRef.current.offsetTop)-10; break;
        default: top = 0;
      }

      scrollRef.current.scroll({ top: top, behavior: "smooth" });
      
      //sauceRef.current.scrollIntoView({ behavior: "smooth" });

      setCurrent(clickedTab);

    }, [tabsRefOffSetTop]);

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

        <div className={`${styles.ingredients}`} ref={scrollRef}>
        {
          ingredients && (
            tabs.map((tab) => {

              const refer = tab.type === 'bun' ? bunRef : tab.type === 'sauce' ? sauceRef:  mainRef;

              return (
                <div key={tab.type}>
                  <p key={tab.type} className="text text_type_main-medium mt-10" ref={refer}>{tab.name}</p>
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