import { store } from '../index';
// import { Action, ActionCreator } from 'redux';
// import { ThunkAction } from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export interface IIngredientItem {
    _id: string,
    type: string,
    name: string,
    price: number,
    calories: number,
    carbohydrates: number,
    fat: number,
    proteins: number,
    image: string,
    image_large: string,
    image_mobile?: string,
    uniqkey?: string | undefined
};

export type TIngredientItem = Omit<IIngredientItem, "uniqkey">

export interface IDragDrop { dragIndex: number; dropIndex: number }

export type TMoveCard = (dragIndex: number, dropIndex: number ) => void;

export interface IDragObject { index: number }
  
export interface IIngredientDetails { header?: string; } 

export interface IModalProps {
    header?: string;
    onClose: (() => void) | undefined;
}

export type TUser = {
    name?: string;
    email?: string ; 
    password?: string;
    token?: string;
}

export interface IResponse<T> {
    success: boolean;
    message?: string;
    name?: string;
    data?: T;
}