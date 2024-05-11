import { FC } from 'react'
import styles from './OrderFeed.module.css';

const OrderFeed: FC = () => {

    return (
        <div className={styles.order_feed_main_content}>
            <p className="text_type_main-default mt-0">
                Скоро здесь будет лента заказов...  
            </p>
    </div>
    )
}
export default OrderFeed;