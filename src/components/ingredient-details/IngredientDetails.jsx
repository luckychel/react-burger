import styles from './IngredientDetails.module.css';

import { Ingredient } from '../../utils/propTypes'

function IngredientDetails (props) {

    return (
        <div className={styles.ingredient_details_main_content}>
            <img src={props.image_large} alt={props.name}></img>
            <div className={styles.ingredient_name}>
                <p className="text text_type_main-medium">{props.name}</p>
            </div>
            <div className={styles.nutrition_values}>
                <div className={styles.value}>
                    <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.calories}</p>
                </div>
                <div className={styles.value}>
                    <p className="text text_type_main-small text_color_inactive">Белки,г</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.proteins}</p>
                </div>
                <div className={styles.value}>
                    <p className="text text_type_main-small text_color_inactive">Жиры,г</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.fat}</p>
                </div>
                <div className={styles.value}>
                    <p className="text text_type_main-small text_color_inactive">Углеводы,г</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = Ingredient

export default IngredientDetails;