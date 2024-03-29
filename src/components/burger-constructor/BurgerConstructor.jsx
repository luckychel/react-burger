import React, { useState } from 'react'
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { BurgerConstructorType } from '../../utils/propTypes'

import Modal from '../modal/Modal'
import OrderDetails from '../order-details/OrderDetails';

function BurgerConstructor({ingredients}) {

   const bun = ingredients?.filter(x => x.type === 'bun')[0];

   const [isOpenOrderDetailsModal, setOrderDetailsOpenModal] = useState(false);

   const handleOrderDetailsClick = () => {
      setOrderDetailsOpenModal(!isOpenOrderDetailsModal);
   }

   return (
      <section className={`${styles.constructor_main_content} ml-10`}>
      {
         ingredients
         && (
            <>
               <div className="pl-5 mt-25 mb-2">
                  <ConstructorElement type='top' text={bun.name + ' (верх)'} price={bun.price} thumbnail={bun.image} isLocked={true} />
               </div>

               <div className={`${styles.components}`}>
                  {
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
                     )
                  }
               </div>

               <div className="pl-5 mt-2">
                  <ConstructorElement type='bottom' isLocked={true} text={bun.name + ' (низ)'} price={bun.price} thumbnail={bun.image} />
               </div>
            </>
            )
      }
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