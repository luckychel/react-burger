
import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger';

export const rootReducer = combineReducers({
    burger: ingredientsReducer,
});