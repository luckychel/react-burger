import React, { useEffect} from 'react'
import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

import { getOrderNumber } from '../../services/actions';
import { useSelector, useDispatch } from 'react-redux';
import { PreLoader } from '../pre-loader/PreLoader';

function OrderDetails ({ids}) {
    
    const { orderNumber, itemsRequest} = useSelector(store => store.burger);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getOrderNumber(ids));
    }, [ids, dispatch]);

    return (
        <div className={styles.order_details_main_content}>

            { orderNumber > 0 && 
                <>
                    <p className="text text_type_digits-large">{orderNumber}</p>
                    <p className='text text_type_main-medium pt-4 pb-10'>идентификатор заказа</p>
                    <div className={`${styles.done} mb-10`}>
                        <div className={styles.done_img}>
                            <CheckMarkIcon type="primary" />
                        </div>
                    </div>
                </>
            }
             { itemsRequest &&
                <>
                    <PreLoader style={{ height: '255px' }} />
                    <p className='text text_type_main-default pt-30'>Ваш заказ начали готовить</p>
                    <p className='text text_type_main-default text_color_inactive pt-2 pb-30'>Дождитесь готовности на орбитальной станции</p>
                 </>
             }
           
        </div>
    )
}

OrderDetails.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default OrderDetails;