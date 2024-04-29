import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function IngredientDetails (props) {
    
    const { ingredientId } = useParams();
    const ingredient = useSelector(store => store.ingredients.listIngredients).filter(x => x._id === ingredientId)[0];

    return (
        <>
            { props.header && 
              (
                <h3 className={`${styles.header} text_type_main-large`}>
                    {props.header}
                </h3>
              )
            }

            { ingredient && 
              (
                <div className={styles.ingredient_details_main_content}>
                    <img src={ingredient.image_large} alt={ingredient.name}></img>
                    <div className={styles.ingredient_name}>
                        <p className="text text_type_main-medium">{ingredient.name}</p>
                    </div>
                    <div className={styles.nutrition_values}>
                        <div className={styles.value}>
                            <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
                            <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                        </div>
                        <div className={styles.value}>
                            <p className="text text_type_main-small text_color_inactive">Белки,г</p>
                            <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                        </div>
                        <div className={styles.value}>
                            <p className="text text_type_main-small text_color_inactive">Жиры,г</p>
                            <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                        </div>
                        <div className={styles.value}>
                            <p className="text text_type_main-small text_color_inactive">Углеводы,г</p>
                            <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                        </div>
                    </div>
                </div>
              )
            }
        </>
    )
}

IngredientDetails.propTypes = { header: PropTypes.string }

export default IngredientDetails;