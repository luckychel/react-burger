import { FC, useEffect } from 'react'
import styles from './OrdersHistory.module.css';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { wsUserConnectionStart, wsUserConnectionDisconnect } from '../../services/actions/wsUser';
import { FeedItem } from '../feed-item/FeedItem';

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
     
    const orders = data?.orders?.sort((a, b) => {
        return b.number - a.number;
    })
    .slice(0,50);

    return (
        <div className={styles.orders_history_main_content}>
            <div className={`${styles.orders_history_list} custom-scroll`}>
                {orders && orders.length > 0 &&
                    orders.map((order, index) => (
                        <FeedItem data={order} key={index} />
                    ))
                }
            </div>
        </div>)
}

export default OrdersHistory;