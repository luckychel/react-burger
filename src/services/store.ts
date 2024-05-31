
import { combineReducers } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ingredientsReducer } from './reducers/ingredients';
import { burgerReducer } from './reducers/burger';
import { userReducer } from './reducers/user';
import { wsReducer } from './reducers/ws';
import { wsUserReducer } from './reducers/wsUser';
import { orderReducer } from './reducers/order';

import { store } from '../index';
import { TIngredientsAction, TBurgerAction, TUserAction, TGetOrderAction } from './actions';
import { TWsActions } from './actions/ws';
import { TWsUserActions } from './actions/wsUser';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    user: userReducer,
    wsAll: wsReducer,
    wsUser: wsUserReducer,
    order: orderReducer
});

export type TApplicationActions = TIngredientsAction | TBurgerAction | TUserAction | TWsActions | TWsUserActions | TGetOrderAction;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;