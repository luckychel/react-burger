import React from 'react'
import styles from './BurgerIngredientItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import PropTypes from 'prop-types';

function BurgerIngredientItem(props) {

    return (
        <div className={styles.ingredient_item_main_content} >
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
    )
}


BurgerIngredientItem.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({  
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string
      })),
};

export default BurgerIngredientItem;