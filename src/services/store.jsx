
import { combineReducers } from 'redux';
import { ingredientsReducer } from './reducers/ingredients';
import { burgerReducer } from './reducers/burger';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burger: burgerReducer,
});