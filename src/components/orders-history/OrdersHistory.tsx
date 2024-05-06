import { FC } from 'react'
import styles from './OrdersHistory.module.css';

const OrdersHistory: FC = () => {

    return (
        <div className={styles.orders_history_main_content}>
            <p className="text_type_main-default mt-0">
                Скоро здесь будет история заказов...
            </p>
        </div>)
}

export default OrdersHistory;