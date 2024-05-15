import { FC } from 'react'
import styles from './OrderFeed.module.css';
import { FeedStatistics } from '../feed-statistics/FeedStatistics';
import { FeedItem } from '../feed-item/FeedItem';
import { TOrder } from '../../utils/types';

const OrderFeed: FC = () => {
    const orders: TOrder[] = [];
    return (
      
        <section className={styles.order_feed_main_content}>
            <p className={`text_type_main-large mt-10 mb-0`}>Лента заказов</p>
            <div className={styles.container}>
                <div className={`${styles.feed_list} ${'custom-scroll'}`}>
                    {orders.map((order, index) => (
                        <FeedItem data={order} key={index} />
                    ))}
                </div>
                <FeedStatistics />
            </div>
      </section>

    )
}
export default OrderFeed;