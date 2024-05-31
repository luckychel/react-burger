import { useEffect, useRef, FC } from 'react'
import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { createOrder } from '../../services/actions';
import { PreLoader } from '../pre-loader/PreLoader';

import { useAppSelector, useAppDispatch } from '../../services/hooks';

const OrderDetails: FC<{ ids: string[] }> = ({ ids}) => {

    const { orderNumber, itemsRequest} = useAppSelector(store => store.burger);

    const dispatch = useAppDispatch();

    const only1time = useRef(true);

    useEffect(() => {
        if (only1time.current) {
            only1time.current = false;
            dispatch(createOrder(ids));
        }
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

export default OrderDetails;