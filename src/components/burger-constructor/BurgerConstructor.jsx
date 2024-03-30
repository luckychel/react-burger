import React, { useState, useEffect, useContext, useReducer } from 'react'
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

//import { BurgerConstructorType } from '../../utils/propTypes'

import '../../utils/randomizers'

import Modal from '../modal/Modal'
import OrderDetails from '../order-details/OrderDetails';
import { IngredientsContext, TotalSumContext  } from '../../services/appContext'

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
   const ingredientsList = useContext(IngredientsContext);

   //Модальное окно заказа
   const [isOpenOrderDetailsModal, setOrderDetailsOpenModal] = useState(false);
   const handleOrderDetailsClick = () => {
      setOrderDetailsOpenModal(!isOpenOrderDetailsModal);
   }

   //Данные для заказа в конструкторе
   const [bun, setBun] = useState(null);
   const [ingredients, setIngredients] = useState(null);
   const [orderItems, setOrderItems] = useState(null);
   const [totalSum, totalSumDispatcher] = useReducer(reducer, totalSumInitial);

   useEffect(() => {
      if (ingredientsList) {

         const bunTemp = ingredientsList?.filter(x => x.type === 'bun').random();
         setBun(bunTemp)
         const ingredientsTemp = ingredientsList?.filter(x => x.type !== 'bun').shuffle();
         setIngredients(ingredientsTemp);

         var newArr = ingredientsTemp.slice();
         newArr.push(bunTemp);
         newArr.unshift(bunTemp);
         setOrderItems(newArr);

         const totalSum = newArr.map(i=>i.price).reduce((a,b)=>a+b);

         totalSumDispatcher({type: 'set', totalSum});
      }
   },[ ingredientsList, setBun, setIngredients, setOrderItems ]);

   return (
      <section className={`${styles.constructor_main_content} ml-10`}>
         <div className={`${styles.container} `}>
            <div className="pl-10 mt-25">
            {
               bun != null ?
               (
                  <ConstructorElement type='top' text={bun.name + ' (верх)'} price={bun.price} thumbnail={bun.image} isLocked={true}/>
               ) : (
                  <div className={`constructor-element constructor-element_pos_top ${styles.custom_aligment}`}>
                     <span className={`constructor-element__row`}>
                        <span className={`constructor-element__text`}>Выберите булки</span>
                     </span>
                  </div>
               )
            }
            </div>

            <div className={`${styles.components} pl-5 pr-2 pt-2 pb-2`}>
            {
               ingredients && ingredients.length > 0 ?
                  ingredients.map((item, index) => 
                     item.type !== 'bun' && 
                     (
                        <div key={item._id} className={styles.total_sum}>
                           <DragIcon type="primary" />
                           <ConstructorElement
                                 text={item.name}
                                 price={item.price}
                                 thumbnail={item.image}
                                 isLocked={false} />
                        </div>
                     )
                  ) : (
                     <div className={`constructor-element ${styles.custom_aligment} ${styles.custom_margin_left}`}>
                        <span className={`constructor-element__row`}>
                           <span className={`constructor-element__text`}>Выберите начинку</span>
                        </span>
                     </div>
                  )
            }
            </div>

            <div className="pl-10">
            {
               bun != null ?
               (
                  <ConstructorElement type='bottom' text={bun.name + ' (низ)'} price={bun.price} thumbnail={bun.image} isLocked={true} />
               ) : (
                  <div className={`constructor-element constructor-element_pos_bottom ${styles.custom_aligment}`}>
                     <span className={`constructor-element__row`}>
                        <span className={`constructor-element__text`}>Выберите булки</span>
                     </span>
                  </div>
               )
            }
         </div>
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

//BurgerConstructor.propTypes = BurgerConstructorType;

export default BurgerConstructor;