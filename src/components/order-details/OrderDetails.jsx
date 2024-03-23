import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function OrderDetails (props) {
    return (
        <div className={styles.order_details_main_content}>
             <p className="text text_type_digits-large">034536</p>
             <p className='text text_type_main-medium pt-4 pb-15'>идентификатор заказа</p>
             <div className={styles.done}>
                <div className={styles.done_img}>
                    <CheckMarkIcon type="primary" />
                </div>
             </div>
             <p className='text text_type_main-default pt-15'>Ваш заказ начали готовить</p>
             <p className='text text_type_main-default text_color_inactive pt-2 pb-30'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;