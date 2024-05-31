import { useState, useRef, useCallback, useMemo, FC } from 'react'
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientItem from '../burger-ingredient-item/BurgerIngredientItem';

import { useAppSelector } from '../../services/hooks';
import { PreLoader } from '../pre-loader/PreLoader'; 

const BurgerIngredients: FC = () => {

    const tabs = useMemo(() => {
      return [
        { name: "Булки", type: 'bun' },
        { name: "Соусы", type: 'sauce' },
        { name: "Начинки", type: 'main' }
      ]
    }, []);

    const {itemsRequest, listIngredients} = useAppSelector(store => store.ingredients);

    const [current, setCurrent] = useState(tabs[0].type);

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const bunRef = useRef<HTMLDivElement | null>(null);
    const sauceRef = useRef<HTMLDivElement | null>(null);
    const mainRef = useRef<HTMLDivElement | null>(null);

    const tabClickHandler = useCallback((clickedTab: string) => {
      if (bunRef.current && sauceRef.current && mainRef.current) {
        switch (clickedTab) {
          case tabs[0].type: bunRef.current.scrollIntoView({ behavior: "smooth" }); break;
          case tabs[1].type: sauceRef.current.scrollIntoView({ behavior: "smooth" }); break;
          case tabs[2].type: mainRef.current.scrollIntoView({ behavior: "smooth" }); break;
          default: bunRef.current.scrollIntoView({ behavior: "smooth" });
        }
        setCurrent(clickedTab);
      }
    }, [tabs]);

    const handleOnScroll = useCallback(() => {
      if (scrollRef.current && bunRef.current && sauceRef.current && mainRef.current) {
        const scrollPosition = scrollRef.current.getBoundingClientRect().top;
        const bunPosition = bunRef.current.getBoundingClientRect().top;
        const saucePosition = sauceRef.current.getBoundingClientRect().top;
        const mainPosition = mainRef.current.getBoundingClientRect().top;

        const bunDiff = Math.abs(scrollPosition - bunPosition);
        const sauceDiff = Math.abs(scrollPosition - saucePosition);
        const maindDiff = Math.abs(scrollPosition - mainPosition);
    
        if (bunDiff < sauceDiff) {
          setCurrent(tabs[0].type);
        } else if (sauceDiff < maindDiff) {
          setCurrent(tabs[1].type);
        } else {
          setCurrent(tabs[2].type);
        }
      }
    }, [tabs]);

    if (itemsRequest) {
      return <PreLoader />
    }

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

        <div className={`${styles.ingredients} mt-10 mb-5`} ref={scrollRef} onScroll={handleOnScroll}>
        {
          listIngredients && (
            tabs.map((tab) => {

              const refer = tab.type === tabs[0].type ? bunRef : tab.type === tabs[1].type ? sauceRef:  mainRef;

              return (
                <div key={tab.type}>
                  <p key={tab.type} className="text text_type_main-medium" ref={refer}>{tab.name}</p>
                  <div className={styles.details}>
                  {
                    listIngredients.filter((item) => item && item.type === tab.type)
                      .map((item) => 
                        item && <BurgerIngredientItem key={item._id} {...item} />
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

export default BurgerIngredients;