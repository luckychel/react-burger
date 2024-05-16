import {  FC } from 'react'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './FeedItem.module.css'
import { Link, useLocation } from 'react-router-dom'
import { TIngredientItem, TOrder } from '../../utils/types'
import { useAppSelector, useAppDispatch } from '../../services/hooks';

export const FeedItem: FC<{ data: TOrder, key: number}> = ({ data, key}) => {

  const location = useLocation()

  const ingredients = useAppSelector(store => store.ingredients.listIngredients);

  let orderIngredients: TIngredientItem[] = []

  data.ingredients.map((x) => {
    (ingredients as TIngredientItem[]).map((i) => {
      if (i._id === x._id) {
        return orderIngredients.push(i)
      }
      return 0
    })
  })

  const visibleSet = new Set(orderIngredients)

  const uniqueVisibleIngredients = Array.from(new Set(orderIngredients)).slice(0, 5)

  const contentVisible = uniqueVisibleIngredients.map((ingredient, index) => (
    <span>List Of Images</span>
  ))

  const uniqueInVisibleIngredients = Array.from(visibleSet).slice(5, 6)

  const invisibleIngredientsQnty =
    orderIngredients.length - uniqueVisibleIngredients.length

  const restOfTheContent = uniqueInVisibleIngredients.map(
    (ingredient, index) => (
        <span>List Of Images</span>
    )
  )

  return (
    <Link key={data.number} to={`${location.pathname}/${data.number}`} state={{ background: location }}
      className={`${styles.feedItem_link} ${'text text_type_digits-default'}`}
    >
      <div className={styles.feed_item_main_content}>
        <div className={styles.feed_item_header}>
          <p className='text text_type_digits-default'>{data.number}</p>
          <FormattedDate
            date={new Date(data.createdAt)}
            className={`${'text text_type_main-small text_color_inactive'} ${
              styles.feed_item_date
            }`}
          />
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
            <div className={styles.feed_item_element}>
              <img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png' />
            </div>
            <div className={styles.feed_item_element}>
              <img src='https://code.s3.yandex.net/react/code/meat-04-mobile.png' />
            </div>
            <div className={styles.feed_item_element}>
              <img src='https://code.s3.yandex.net/react/code/meat-01-mobile.png' />
            </div>
            <div className={styles.feed_item_element}>
              <img src='https://code.s3.yandex.net/react/code/sauce-02-mobile.png' />
            </div>
          </div>
          <div className={styles.total_cost}>
            <p className="text text_type_digits-default">{12345}</p>&nbsp;<CurrencyIcon type="primary" />
        </div>
        </div>
      </div>
    </Link>
  )
}