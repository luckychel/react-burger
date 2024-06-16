import { FC, useState, useEffect } from 'react'
import styles from './Order.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { TIngredientItem } from '../../utils/types'
import { PreLoader } from '../pre-loader/PreLoader';
import { getOrder } from '../../services/actions';

const Order: FC = () => {
    
    const [totalCost, setTotalCost] = useState(0);
    const [orderIngredients, setOrderIngredients] = useState<TIngredientItem[] | null>(null);

    const { number } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getOrder(number || "")); 
    }, [dispatch, number]);

    const {orderRequest, order } = useAppSelector(store => store.order);
    const ingredients = useAppSelector(store => store.ingredients.listIngredients);

    useEffect(() => {  
      if (order && ingredients) {
  
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

        let resultIngrediets: TIngredientItem[] = []
        orderIngredients.map(item => {
            const found = resultIngrediets.findIndex((element) => element._id === item._id);
            if (found < 0) {
                return resultIngrediets.push({...item, count_x: 1});
            }
            else
            {
                return resultIngrediets[found].count_x! += + 1;
            }
        });

        setOrderIngredients(resultIngrediets);
        setTotalCost(resultIngrediets.reduce(function (a, b) { return a + b.price * (b.count_x || 1) }, 0));
      }
    }, [order, ingredients])

    const location = useLocation();
    const background = location.state && location.state.background;

    if (orderRequest) {
        return <PreLoader />
    }

    return (
        <>
        {
            order && (
            <div className={`${styles.orders_history_main_content} ${!background ? "mt-20" : ""}`}>
                <div className={`${styles.container}`}>
                    { !background && 
                        (
                            <div className={styles.order_number}>
                                <p className="text text_type_digits-default"># {number}</p>
                            </div> 
                        ) 
                    }
                    <p className={'text text_type_main-medium mb-3'}>{order.name}</p>
                
                    <p className={`${'text text_type_main-default mb-6'} ${order.status === 'done' ? styles.order_caption_active : styles.order_caption }`}>
                    {
                        order.status === 'done'
                            ? 'Выполнен'
                            : order.status === 'pending'
                            ? 'Готовится'
                            : 'Отменен'
                    }
                    </p>

                    <p className={'text text_type_main-medium mb-6'}>Состав:</p>
                    <ul className={`${styles.ingredients_list} mb-10 pr-6`}>
                    {
                        orderIngredients && orderIngredients.map((item, index) => 
                        { 
                            return (
                                <div className={styles.ingredients_item} key={index}> 
                                    <img className={`${styles.ingredient_icon} mr-4`} src={item.image} alt={item.name}/>

                                    <p className="text text_type_main-small">{item.name}</p>
                                    <div className={styles.ingredients_item_total}>
                                        <p className="text text_type_digits-default">{item.count_x}</p>
                                        <p className="text text_type_main-small mr-2 ml-2">x</p>
                                        <p className="text text_type_digits-default mr-2">{item.price}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </div> 
                            )
                        })
                    } 
                    </ul>
                    <div className={styles.time_total}>
                        <FormattedDate date={new Date(order.createdAt)} className={`${'text text_type_main-default text_color_inactive'}`} />
                        <div className={styles.total_cost}>
                            <span className={'text text_type_digits-default mr-2'}>{totalCost}</span>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        </>
    )
}   

export default Order;