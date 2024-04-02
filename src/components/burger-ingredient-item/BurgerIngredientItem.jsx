import React, { useEffect, useState } from 'react'
import styles from './BurgerIngredientItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import { Ingredient } from '../../utils/propTypes'

import Modal from '../modal/Modal'
import IngredientDetails from '../ingredient-details/IngredientDetails'

import { useSelector, useDispatch } from 'react-redux';

import { createSelector } from '@reduxjs/toolkit'
import { OPEN_INGREDIENT, CLOSE_INGREDIENT } from '../../services/actions';

import { useDrag } from 'react-dnd'

function BurgerIngredientItem(props) {

    const [isOpenModal, setOpenModal] = useState(false);
    
    const dispatch = useDispatch();

    const handleIngredientClick = (param) => {
        if (param) {
            dispatch({
                type: OPEN_INGREDIENT,
                currentIngredient: {...props}
            })
        }
        else {
            dispatch({
                type: CLOSE_INGREDIENT
            })
        }
        setOpenModal(param);
    }
    
    const currentIngredient = useSelector(store => store.ingredients.currentIngredient);    

    const count = useSelector(store => store.burger.burgerIngredients).filter(item => item._id === props._id);

    const [, drag] = useDrag({
        type: props.type === "bun" ? "bun" : "item",
        item: props,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    
    return (
       <>
        <div className={styles.ingredient_item_main_content} onClick={() => handleIngredientClick(true)}  ref={drag}>
            {
                count.length > 0 && (<Counter count={count.length} size="default" extraClass="m-1" />)
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
        { 
            isOpenModal && 
                <Modal onClose={() => handleIngredientClick(false)} header='Детали ингредиента'>
                    <IngredientDetails {...currentIngredient}></IngredientDetails>
                </Modal>
                
        }
       </>
    )
}

BurgerIngredientItem.propTypes = Ingredient;

export default BurgerIngredientItem;