
import { FC, ReactNode, useState, useEffect } from 'react'
import styles from './FeedStatistics.module.css'
import { TOrder } from '../../utils/types'
import { useAppSelector } from '../../services/hooks';

export const FeedStatistics: FC = () => {

   const [totalAll, setTotalAll] = useState(0);
   const [totalToday, setTotalToday] = useState(0);

   const [ordersReadyList, setOrdersReadyList] = useState<ReactNode>(null);
   const [ordersInWorkList, setOrdersInWorkList] = useState<ReactNode>(null);

   const { data } = useAppSelector(store => store.wsAll);

   useEffect(() => { 

      if (data) {
         
         setTotalAll(data.total);
         setTotalToday(data.totalToday);

         const ordersReady: TOrder[] = (data.orders as TOrder[])
            .filter((item) => item.status === 'done')
            .slice(0, 20)
     
         const ordersInWork: TOrder[] = (data.orders as TOrder[])
            .filter((item) => item.status !== 'done')
            .slice(0, 20)
         
         setOrdersReadyList(ordersReady.map((item, index: number) => (
            <li
               className='text text_type_digits-default' key={index}>
               {item.number}
            </li>
            ))
         )

         setOrdersInWorkList(ordersInWork.map((item, index: number) => (
            <li className='text text_type_digits-default' key={index}>
               {item.number}
            </li>
            ))
         )
      }
    }, [data?.orders])

  return (
    <div className={styles.feed_statistics_main_content}>
      <div className={styles.feed_statistics_table}>
        <div className={styles.feed_statistics_status}>
          <h2 className={`${'text text_type_main-medium'}`}>Готовы:</h2>
          <ul className={`${styles.feed_statistics_orders} ${styles.feed_statistics_orders_ready}`}>{ordersReadyList}</ul>
        </div>
        <div className={styles.feed_statistics_status}>
          <h2 className={`${'text text_type_main-medium'}`}>В работе:</h2>
          <ul className={`${styles.feed_statistics_orders} ${styles.feed_statistics_orders_in_work}`}>{ordersInWorkList}</ul>
        </div>
      </div>
      <div>
        <h2 className={'text text_type_main-medium'}>Выполнено за все время:</h2>
        <p className={`${'text text_type_digits-large'} ${styles.feed_statistics_orders_shadow}`}>{totalAll}</p>
      </div>
      <div>
        <h2 className={'text text_type_main-medium'}>Выполнено за сегодня:</h2>
        <p className={`${'text text_type_digits-large'} ${styles.feed_statistics_orders_shadow}`}>{totalToday}</p>
      </div>
    </div>
  )
}