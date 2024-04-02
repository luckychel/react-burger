import React, { useState, useEffect, useReducer } from 'react'
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import '../../utils/randomizers'

import Modal from '../modal/Modal'
import OrderDetails from '../order-details/OrderDetails';
import BurgerBun from '../burger-bun-item/BurgerBun'

import { TotalSumContext  } from '../../services/appContext'


import { useSelector, useDispatch } from 'react-redux'
import { ADD_INGREDIENT_TO_BURGER, REMOVE_INGREDIENT_FROM_BURGER } from '../../services/actions';
import { useDrop } from 'react-dnd'


const totalSumInitial = 0; 

function reducer(state, action) {
  switch (action.type) {
    case "set":
      return action.totalSum;
    case "reset":
      return totalSumInitial;
    default:
      throw new Error(`Не известный тип в BurgerConstructor reducer action: ${action.type}`);
  }
}


function BurgerConstructor(props) {

   //Данные ингредиентов
   const ingredientsList = useSelector(store => store.burger.burgerIngredients);
   
   //Модальное окно заказа
   const [isOpenOrderDetailsModal, setOrderDetailsOpenModal] = useState(false);
   const handleOrderDetailsClick = () => {
      setOrderDetailsOpenModal(!isOpenOrderDetailsModal);
   }

   //Данные для заказа в конструкторе
   const [ingredients, setIngredients] = useState(null);
   const [orderItems, setOrderItems] = useState(null);
   const [totalSum, totalSumDispatcher] = useReducer(reducer, totalSumInitial);

   useEffect(() => {
      if (ingredientsList && ingredientsList.length > 0) {

         const ingredientsTemp = ingredientsList?.filter(x => x.type !== 'bun');
         setIngredients(ingredientsTemp);

         const totalSum = ingredientsList.map(i=>i.price).reduce((a,b)=>a+b);

         totalSumDispatcher({type: 'set', totalSum});
      }
   },[ ingredientsList, setOrderItems ]);


  const [isHoverBun, setHover] = useState(false);
  
  const setBuhHover = (val) => {
      setHover(val)
  }

  const dispatch = useDispatch();

  const [{ isItemHover }, refItemDrop] = useDrop({
      accept: "item",
      collect: monitor => ({
         isItemHover: monitor.isOver(),
      }),
      drop(item) {
         dispatch({
            type: ADD_INGREDIENT_TO_BURGER,
            draggedIngredient: item
          });
      },
   });

   return (
      <section className={`${styles.constructor_main_content} ml-10`}>
         <div className={`${styles.container} pt-25`}>
            
            <BurgerBun pos="top" setHover={setBuhHover} isHoverBunParent={isHoverBun} />

            <div className={`${styles.components} pl-5 pr-2 pt-2 pb-2`} ref={refItemDrop}>
            {
               ingredients && ingredients.length > 0 ?
                  ingredients.map((item, index) => 
                     item.type !== 'bun' && 
                     (
                        <div key={item.uniqkey} className={styles.total_sum}>
                           <DragIcon type="primary" />
                           <ConstructorElement
                                 text={item.name}
                                 price={item.price}
                                 thumbnail={item.image}
                                 isLocked={false} />
                        </div>
                     )
                  ) : (
                     <div className={`constructor-element ${styles.custom_aligment} ${styles.custom_margin_left} ${isItemHover ? styles.isHover : ''}`}>
                        <span className={`constructor-element__row`}>
                           <span className={`constructor-element__text`}>Выберите начинку</span>
                        </span>
                     </div>
                  )
            }
            </div>

            <BurgerBun pos="bottom" setHover={setBuhHover} isHoverBunParent={isHoverBun} />
            
      </div>
      <TotalSumContext.Provider value={totalSum}>
         <div className={`${styles.total} mt-10`}>
            <span className={`${styles.total_sum} mr-10 text_type_digits-medium`}>
               {totalSum} 
               <CurrencyIcon type="primary" />
            </span>
            <Button type="primary" size="large" htmlType='button' onClick={handleOrderDetailsClick}>
               Оформить заказ
            </Button>
         </div>
      </TotalSumContext.Provider>
      { 
         isOpenOrderDetailsModal && 
            <Modal onClose={() => setOrderDetailsOpenModal(false)}>
               <OrderDetails value={orderItems} />
            </Modal>
      }
      </section>
  )
}

export default BurgerConstructor;