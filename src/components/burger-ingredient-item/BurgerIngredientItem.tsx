import { useState, useCallback, useEffect, FC } from 'react'
import styles from './BurgerIngredientItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import { useSelector, useDispatch } from 'react-redux';
import { dragging } from '../../services/actions';
import { useDrag  } from 'react-dnd'

import { Link, useLocation } from 'react-router-dom';

import { IIngredientItem } from '../../utils/types';

const BurgerIngredientItem: FC<IIngredientItem> = ({...props}) => {

    const [isDraggingBun, setDraggingBun] = useState(false);
    const [isDraggingIng, setDraggingIng] = useState(false);

    let countBun: IIngredientItem = useSelector((store: any) => store.burger.bun); 
    let countIng: [IIngredientItem] = useSelector((store: any) => store.burger.burgerIngredients).filter((item: IIngredientItem) => item._id === props._id);
    let count = 0;

    if (props.type === 'bun')
        count = countBun && countBun._id === props._id ? 2 : 0;
    else
        count = countIng.length;

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(dragging(isDraggingBun, isDraggingIng));
    }, [isDraggingBun, isDraggingIng, dispatch])

    const beginDrugging = useCallback((type: string, val: boolean) => {
          if (type === "bun")
            setDraggingBun(val)
          else
            setDraggingIng(val)
      }, [setDraggingBun, setDraggingIng]);

    const [ , drag] = useDrag({
        type: props.type === "bun" ? "bun" : "item",
        item: props,
        collect: monitor => {
            beginDrugging((props.type === "bun" ? "bun" : "item"), monitor.isDragging());
        }
    });

    const location = useLocation();

    return (
        <Link key={props._id} to={`/ingredients/${props._id}`} state={{ background: location }} className={styles.link}>
            <div className={styles.ingredient_item_main_content} ref={drag}>
                {
                    count > 0 && (<Counter count={count} size="default" extraClass="m-1" />)
                }
                <img src={props.image} alt={props.name} title={props.name}></img>

                <span className={`${styles.ingredient_item_price} mt-2 mb-1 text text_type_digits-default`}>
                    {props.price}
                    <CurrencyIcon type="primary" />
                </span>
                
                <span className={`${styles.ingredient_item_name} text text_type_main-small`}>
                    {props.name}
                </span>
            </div>
       </Link>
    )
}

export default BurgerIngredientItem;