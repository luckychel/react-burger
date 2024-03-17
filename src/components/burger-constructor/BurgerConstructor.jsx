import React from 'react'
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import ingredientType from '../../utils/propTypes'

function BurgerConstructor(props) {

   const components = props.data;
   const bun = components?.filter(x => x.type === 'bun')[0];

   return (
      <section className={`${styles.constructor_main_content} ml-10`}>
            {
              components
              && (
                  <>
                  <div className="pl-5 mt-25 mb-2">
                      <ConstructorElement type='top' text={bun.name + ' (верх)'} price={bun.price} thumbnail={bun.image} isLocked={true} />
                  </div>

                  <div className={styles.components}>
                      {
                        components.map((item, index) => 
                           item.type !== 'bun' && 
                           (
                              <div key={item._id}>
                                 <DragIcon type="primary" />
                                 <ConstructorElement
                                       text={item.name}
                                       price={item.price}
                                       thumbnail={item.image}
                                       isLocked={false}
                                        />
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
               <Button type="primary" size="large">
                  Оформить заказ
               </Button>
            </div>

      </section>
  )
}

BurgerConstructor.propTypes = ingredientType;

export default BurgerConstructor;