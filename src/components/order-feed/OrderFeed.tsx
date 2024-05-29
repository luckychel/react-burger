import { FC, useEffect } from 'react'
import styles from './OrderFeed.module.css';
import { FeedStatistics } from '../feed-statistics/FeedStatistics';
import { FeedItem } from '../feed-item/FeedItem';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { wsConnectionStart, wsConnectionDisconnect } from '../../services/actions/ws';

const OrderFeed: FC = () => {

   const { connected, data } = useAppSelector(store => store.wsAll);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if(!connected) {
        dispatch(wsConnectionStart());
      }
      return () => {
         if (connected) {
            dispatch(wsConnectionDisconnect());
         }
      }

    }, [dispatch, connected]);

    return (
      
        <section className={styles.order_feed_main_content}>
            <p className={`text_type_main-large mt-10 mb-0`}>Лента заказов</p>
            <div className={styles.container}>
                <div className={`${styles.feed_list} ${'custom-scroll'}`}>
                    {data?.orders && data.orders.length > 0 &&
                        data?.orders.map((order, index) => (
                           <FeedItem data={order} key={index} />
                        ))
                    }
                </div>
                <FeedStatistics />
            </div>
      </section>

    )
}
export default OrderFeed;