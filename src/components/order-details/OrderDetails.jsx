import React, { useEffect} from 'react'
import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

import { getOrderNumber } from '../../services/actions';
import { useSelector, useDispatch } from 'react-redux';

function OrderDetails ({ids}) {
    
    const orderNumber = useSelector(store => store.burger.orderNumber);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getOrderNumber(ids));
    }, [ids, dispatch]);

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

OrderDetails.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.string)
}

export default OrderDetails;