import React, { useEffect, useState } from 'react'
import styles from './BurgerBun.module.css';
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'

import { useSelector, useDispatch } from 'react-redux'
import { ADD_INGREDIENT_TO_BURGER, REMOVE_INGREDIENT_FROM_BURGER } from '../../services/actions';
import { useDrop } from 'react-dnd'

function BurgerBun(props) {

    const bunItems = useSelector(store => store.burger.burgerIngredients).filter(item => item.type === 'bun');

    const dispatch = useDispatch();

    const [{ isBunHover }, refBunDrop] = useDrop({
       accept: "bun",
       collect: monitor => ({
          isBunHover: monitor.isOver(),
       }),
       drop(item) {
          for(let i = 0; i < 2; i++) {
            if(bunItems.length > 0) {
              let id = bunItems[0]._id;  
              dispatch({
                type: REMOVE_INGREDIENT_FROM_BURGER,
                id: id
              });
            }
            dispatch({
              type: ADD_INGREDIENT_TO_BURGER,
              draggedIngredient: item
            });
          }
       },
    });

    useEffect(() => {
        props.setHover(isBunHover)
    }, [isBunHover])

    return (
        <div className={`pl-10`} ref={refBunDrop} >
        {
            bunItems && bunItems[0] ?
            (
                <ConstructorElement type={props.pos} text={`${bunItems[0].name} ${props.pos === 'top' ? ' (верх)' : ' (низ)'}`} 
                    price={bunItems[0].price} 
                    thumbnail={bunItems[0].image} 
                    isLocked={true} 
                    extraClass={isBunHover || props.isHoverBunParent ? styles.isHover : ''}/>
            ) : (
                <div className={`constructor-element constructor-element_pos_${props.pos} ${styles.custom_aligment} ${isBunHover || props.isHoverBunParent ? styles.isHover : ''}`}>
                    <span className={`constructor-element__row`}>
                    <span className={`constructor-element__text`}>Выберите булки</span>
                    </span>
                </div>
            )
        }
        </div>
    )
}

export default BurgerBun;