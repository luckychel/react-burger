import { FC, ReactNode, useState, useEffect } from 'react'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './FeedItem.module.css'
import { Link, useLocation } from 'react-router-dom'
import { TIngredientItem, TOrder } from '../../utils/types'
import { useAppSelector } from '../../services/hooks';

export const FeedItem: FC<{ data: TOrder}> = ({ data }) => {

  const [totalCost, setTotalCost] = useState(0);
  const [contentVisible, setContentVisible] = useState<ReactNode>(null);
  const [restContent, setRestContent] = useState<ReactNode>(null);
  const location = useLocation()

  const ingredients = useAppSelector(store => store.ingredients.listIngredients);

  useEffect(() => {  
    if (data.ingredients && ingredients) {

      let orderIngredients: TIngredientItem[] = []

      data.ingredients.map((x) => (
        (ingredients as TIngredientItem[]).map((i) => {
          if (i._id === x.toString()) {
            return orderIngredients.push(i)
          }
          else 
            return null
        })
      ))

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
  }, [data.ingredients, ingredients])

  return (
    <Link key={data.number} to={`${location.pathname}/${data.number}`} state={{ background: location }}
      className={`${styles.feed_item_link} ${'text text_type_digits-default'}`}>
      <div className={styles.feed_item_main_content}>
        <div className={styles.feed_item_header}>
          <p className='text text_type_digits-default'>#{data.number}</p>
          <FormattedDate  date={new Date(data.createdAt)} className={`${'text text_type_main-small text_color_inactive'} ${styles.feed_item_date}`} />
        </div>
        <h2 className={`${'text text_type_main-medium'}`}>{data.name}</h2>
          {location.pathname === '/profile/orders' && (
            <p className={`${'text text_type_main-default'} ${data.status === 'created' ? styles.feed_item_caption_active : styles.feed_item_caption }`}>
            {
              data.status === 'done'
                ? 'Выполнен'
                : data.status === 'pending'
                ? 'Отменен'
                : 'Готовится'
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