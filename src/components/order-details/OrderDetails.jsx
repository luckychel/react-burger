import React, {useState, useEffect} from 'react'
import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientsType } from '../../utils/propTypes'
import { request } from '../../utils/api';

function OrderDetails ({ids}) {
    
    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(() => { 
        if (ids) {
            request('orders', { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json;charset=utf-8' }, 
                    body: JSON.stringify({ 'ingredients': ids})
                })
                .then(data => { 
                    if (data && data.order && data.order.number) {
                        setOrderNumber(data.order.number);
                    }
                })
                .catch(e => {
                    console.error('Error: ' + e.message);
                });
        }
    },[ids]);
    
    return (
        <div className={styles.order_details_main_content}>
             <p className="text text_type_digits-large">{orderNumber}</p>
             <p className='text text_type_main-medium pt-4 pb-15'>идентификатор заказа</p>
             <div className={styles.done}>
                <div className={styles.done_img}>
                    <CheckMarkIcon type="primary" />
                </div>
             </div>
             <p className='text text_type_main-default pt-15'>Ваш заказ начали готовить</p>
             <p className='text text_type_main-default text_color_inactive pt-2 pb-30'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = IngredientsType;

export default OrderDetails;