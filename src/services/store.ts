
import { combineReducers, Action, ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ingredientsReducer } from './reducers/ingredients';
import { burgerReducer } from './reducers/burger';
import { userReducer } from './reducers/user';
import { wsReducer } from './reducers/ws';
import { wsUserReducer } from './reducers/wsUser';

import { store } from '../index';
import { TIngredientsAction, TBurgerAction, TUserAction } from './actions';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    user: userReducer,
    wsAll: wsReducer,
    wsUser: wsUserReducer,
});

type TApplicationActions = TIngredientsAction | TBurgerAction | TUserAction;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>; 
// export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;