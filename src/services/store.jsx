
import { combineReducers } from 'redux';
import { ingredientsReducer } from './reducers/ingredients';
import { burgerReducer } from './reducers/burger';
import { userReducer } from './reducers/user';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    user: userReducer
});