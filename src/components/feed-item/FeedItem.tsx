import { FC, ReactNode, useState, useEffect } from 'react'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './FeedItem.module.css'
import { Link, useLocation } from 'react-router-dom'
import { TIngredientItem, TOrder } from '../../utils/types'
import { useAppSelector } from '../../services/hooks';

export const FeedItem: FC<{ order: TOrder}> = ({ order }) => {

  const [totalCost, setTotalCost] = useState(0);
  const [contentVisible, setContentVisible] = useState<ReactNode>(null);
  const [restContent, setRestContent] = useState<ReactNode>(null);
  const location = useLocation()

  const ingredients = useAppSelector(store => store.ingredients.listIngredients);

  useEffect(() => {  
    if (order.ingredients && ingredients) {

      let orderIngredients: TIngredientItem[] = [];

      (order.ingredients as string[]).map((x) => (
        (ingredients as TIngredientItem[]).map((i) => {
        if (i._id === x) {
          return orderIngredients.push(i)
        }
        else 
          return null
      })
     ));

      setTotalCost(orderIngredients.reduce(function (a, b) { return a + b.price }, 0));

      const uniqIngredients  = new Set(orderIngredients)
      const uniqVisibleIngredients = Array.from(uniqIngredients).slice(0, 5)
    
      setContentVisible(uniqVisibleIngredients.map((ingredient, index) => (
         <div key={index} className={styles.feed_item_element}>
          <img src={ingredient.image_mobile} alt={ingredient.name}/>
        </div>
      )))
    
      const uniqInvisibleIngredients = Array.from(uniqIngredients).slice(5, 6)
      const invisibleIngredientsQnty = orderIngredients.length - uniqVisibleIngredients.length
    
      setRestContent(uniqInvisibleIngredients.map((ingredient, index) => (
        <div key={index} className={`${styles.feed_item_element}`}>
            <img src={ingredient.image_mobile} alt={ingredient.name} />
            <span className={styles.brief_order_overlay} />
            <span className={`${styles.brief_order_counter} ${'text text_type_digits-default'}`}>
              {`+${invisibleIngredientsQnty}`}
            </span>
          </div>
      )))
    }
  }, [order.ingredients, ingredients])

  return (
    <Link key={order.number} to={`${location.pathname}/${order.number}`} state={{ background: location }}
      className={`${styles.feed_item_link} ${'text text_type_digits-default'}`}>
      <div className={styles.feed_item_main_content}>
        <div className={styles.feed_item_header}>
          <p className='text text_type_digits-default'>#{order.number}</p>
          <FormattedDate date={new Date(order.createdAt)} className={`${'text text_type_main-small text_color_inactive'} ${styles.feed_item_date}`} />
        </div>
        <h2 className={`${'text text_type_main-medium'}`}>{order.name}</h2>
          {location.pathname === '/profile/orders' && (
            <p className={`${'text text_type_main-default'} ${order.status === 'created' ? styles.feed_item_caption_active : styles.feed_item_caption }`}>
            {
              order.status === 'done'
                ? 'Выполнен'
                : order.status === 'pending'
                ? 'Готовится'
                : 'Отменен'
            }
            </p>
          )}
        <div className={styles.feed_item_brief_order}>
          <div className={styles.feed_item_images}>
            {restContent}
            {contentVisible}
          </div>
          <div className={styles.total_cost}>
            <p className="text text_type_digits-default">{totalCost}</p>&nbsp;<CurrencyIcon type="primary" />
        </div>
        </div>
      </div>
    </Link>
  )
}