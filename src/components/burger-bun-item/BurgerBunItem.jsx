import React, { } from 'react'
import styles from './BurgerBunItem.module.css';
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'

import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../services/actions';
import { useDrop } from 'react-dnd'

function BurgerBunItem({pos, bun}) {
 
    const isDraggingBun = useSelector(store => store.ingredients.isDraggingBun);

    const dispatch = useDispatch();

    const [{ isBunHover }, refBunDrop] = useDrop({
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

BurgerBunItem.propTypes = {
    pos: PropTypes.string
}

export default BurgerBunItem;