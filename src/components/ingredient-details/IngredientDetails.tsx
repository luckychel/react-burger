import { FC } from 'react'
import styles from './IngredientDetails.module.css';
import { useParams } from 'react-router-dom';

import { IIngredientDetails } from '../../utils/types';
import { useAppSelector } from '../../services/hooks';

const IngredientDetails: FC<IIngredientDetails> = ({...props}) => {
    
    const { ingredientId } = useParams<string>();
    const ingredient = useAppSelector(store => store.ingredients.listIngredients).filter(item => item && item._id === ingredientId)[0];

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
                        <p data-test="ingredient_name" className="text text_type_main-medium">{ingredient.name}</p>
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

export default IngredientDetails;