import { FC, useState, useEffect } from 'react'
import styles from './OrdersHistory.module.css';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { wsUserConnectionStart, wsUserConnectionDisconnect } from '../../services/actions/wsUser';

const OrdersHistory: FC = () => {
    const { user } = useAppSelector(store => store.user);
    const { connected, data } = useAppSelector(store => store.wsUser);
    const dispatch = useAppDispatch();
 
    useEffect(() => {
       if(!connected && user) {
         dispatch(wsUserConnectionStart());
       }
       return () => {
          if (connected) {
             dispatch(wsUserConnectionDisconnect());
          }
       }
 
     }, [dispatch, connected]);

    return (
        <div className={styles.orders_history_main_content}>
            <p className="text_type_main-default mt-0">
                Скоро1 здесь будет история заказов...
            </p>
        </div>)
}

export default OrdersHistory;