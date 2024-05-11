import { FC } from 'react'
import styles from './BurgerBunItem.module.css';
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'

import { addItem } from '../../services/actions';
import { useDrop } from 'react-dnd'

import { TIngredientItem } from '../../utils/types';
import { useAppSelector, useAppDispatch } from '../../services/hooks';

const BurgerBunItem: FC<{pos: 'top' | 'bottom'; bun: TIngredientItem | null;}> = ({pos, bun}) => {

    const isDraggingBun = useAppSelector(store => store.ingredients.isDraggingBun);

    const dispatch = useAppDispatch();

    const [{ isBunHover }, refBunDrop] = useDrop<TIngredientItem, unknown, any>({
       accept: "bun",
       collect: monitor => ({
          isBunHover: monitor.isOver(),
       }),
       drop(item) {
          dispatch(addItem(item, 'bun'));
       },
    });

    return (
        <div className={`pl-10`} ref={refBunDrop} >
        {
            bun ?
            (
                <ConstructorElement type={pos} text={`${bun.name} ${pos === 'top' ? ' (верх)' : ' (низ)'}`} 
                    price={bun.price} 
                    thumbnail={bun.image} 
                    isLocked={true} 
                    extraClass={isBunHover || isDraggingBun ? styles.isHover : ''} />
            ) : (
                <div className={`constructor-element constructor-element_pos_${pos} ${styles.custom_aligment} ${isBunHover || isDraggingBun ? styles.isHover : ''}`}>
                    <span className={`constructor-element__row`}>
                    <span className={`constructor-element__text`}>Выберите булки</span>
                    </span>
                </div>
            )
        }
        </div>
    )
}

export default BurgerBunItem;