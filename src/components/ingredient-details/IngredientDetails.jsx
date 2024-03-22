import styles from './IngredientDetails.module.css';
import { Ingredient } from '../../utils/propTypes'

function IngredientDetails (props) {

    const item = props.children;

    return (
        <div className={styles.content}>
            <img src={item.image_large} alt={item.name}></img>
            <div className={styles.ingredient_name}>
                <p className="text text_type_main-medium">{item.name}</p>
            </div>
            <div className={styles.nutrition_values}>
                <div className={styles.value}>
                    <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.calories}</p>
                </div>
                <div className={styles.value}>
                    <p className="text text_type_main-small text_color_inactive">Белки,г</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.proteins}</p>
                </div>
                <div className={styles.value}>
                    <p className="text text_type_main-small text_color_inactive">Жиры,г</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.fat}</p>
                </div>
                <div className={styles.value}>
                    <p className="text text_type_main-small text_color_inactive">Углеводы,г</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

/*
IngredientDetails.propTypes = {
    children: Ingredient
};
*/

export default IngredientDetails;