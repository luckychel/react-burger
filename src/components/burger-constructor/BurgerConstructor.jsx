import React, { useState } from 'react'
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { BurgerConstructorType } from '../../utils/propTypes'

import Modal from '../modal/Modal'
import OrderDetails from '../order-details/OrderDetails';

function BurgerConstructor({ingredients}) {

   const bun =  null;//ingredients?.filter(x => x.type === 'bun')[0];
   ingredients = null;

   const [isOpenOrderDetailsModal, setOrderDetailsOpenModal] = useState(false);

   const handleOrderDetailsClick = () => {
      setOrderDetailsOpenModal(!isOpenOrderDetailsModal);
   }

   return (
      <section className={`${styles.constructor_main_content} ml-10`}>
         <div className={`${styles.container} `}>
            <div className="pl-10 mt-25">
            {
               bun == null ?
               (
                  <div className={`constructor-element constructor-element_pos_top ${styles.custom_aligment}`}>
                     <span class="constructor-element__row">
                        <span class="constructor-element__text">Выбирете булки</span>
                     </span>
                  </div>
               ) : (
                  <ConstructorElement type='top' text={bun.name + ' (верх)'} price={bun.price} thumbnail={bun.image} isLocked={true}/>
               )
            }
            </div>

            <div className={`${styles.components} pl-5 pr-2 pt-2 pb-2`}>
            {
               ingredients && ingredients.length > 0 ?
                  ingredients.map((item, index) => 
                     item.type !== 'bun' && 
                     (
                        <div key={item._id}>
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
                        <span class="constructor-element__row">
                           <span class="constructor-element__text">Выбирете начинку</span>
                        </span>
                     </div>
                  )
            }
            </div>

            <div className="pl-10">
            {
               bun == null ?
               (
                  <div className={`constructor-element constructor-element_pos_bottom ${styles.custom_aligment}`}>
                     <span class="constructor-element__row">
                        <span class="constructor-element__text">Выбирете булки</span>
                     </span>
                  </div>
               ) : (
                  <ConstructorElement type='bottom' text={bun.name + ' (низ)'} price={bun.price} thumbnail={bun.image} isLocked={true} />
               )
            }
         </div>
      </div>

      <div className={`${styles.total} mt-10`}>
         <span className={`${styles.total_sum} mr-10 text_type_digits-medium`}>
            600 
            <CurrencyIcon type="primary" />
         </span>
         <Button type="primary" size="large" htmlType='button' onClick={handleOrderDetailsClick}>
            Оформить заказ
         </Button>
      </div>
      { 
         isOpenOrderDetailsModal && 
            <Modal onClose={() => setOrderDetailsOpenModal(false)}>
               <OrderDetails />
            </Modal>
      }
      </section>
  )
}

BurgerConstructor.propTypes = BurgerConstructorType;

export default BurgerConstructor;