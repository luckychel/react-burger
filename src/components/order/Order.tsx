import { FC } from 'react'
import styles from './Order.module.css';

const Order: FC = () => {
    
    return (
        <div className={styles.orders_history_main_content}>
            <p className="text_type_main-default">
                Скоро здесь будет выбранный заказ...
            </p>
        </div>)
}

export default Order;