import React, { useState } from 'react'
import styles from './BurgerIngredientItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import { Ingredient } from '../../utils/propTypes'

import Modal from '../modal/Modal'
import IngredientDetails from '../ingredient-details/IngredientDetails'

function BurgerIngredientItem(props) {

    const [isOpenModal, setOpenModal] = useState(false);

    const handleIngredientClick = () => {
        setOpenModal(!isOpenModal);
    }

    return (
       <>
        <div className={styles.ingredient_item_main_content} onClick={handleIngredientClick}>
            <Counter count={1} size="default" extraClass="m-1" />
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
                <Modal onClose={setOpenModal(false)} header='Детали ингредиента'>
                    <IngredientDetails {...props}></IngredientDetails>
                </Modal>
                
        }
       </>
    )
}

BurgerIngredientItem.propTypes = Ingredient;

export default BurgerIngredientItem;