import { FC, useEffect } from 'react'
import styles from './OrderFeed.module.css';

import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { wsConnectionStart, wsConnectionDisconnect } from '../../services/actions/ws';
import { FeedItem } from '../feed-item/FeedItem';
import { FeedStatistics } from '../feed-statistics/FeedStatistics';
import { PreLoader } from '../pre-loader/PreLoader';

const OrderFeed: FC = () => {

   const { connected, data, isRequest} = useAppSelector(store => store.wsAll);
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

    if (isRequest) {
        return <PreLoader />
    }

    return (
      
        <section className={styles.order_feed_main_content}>
            <p className={`text_type_main-large mt-10 mb-0`}>Лента заказов</p>
            <div className={`${styles.container} mt-2`}>
                <div className={`${styles.feed_list} custom-scroll`}>
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