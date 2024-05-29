import { request, fetchWithRefresh, headers, checkResponse } from '../../utils/api';
import { nanoid } from '@reduxjs/toolkit'
import { AppDispatch, AppThunkAction } from '../store';

import { INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_FAILED, 
  ADD_INGREDIENT_TO_BURGER, REMOVE_INGREDIENT_FROM_BURGER, OPEN_INGREDIENT, CLOSE_INGREDIENT,
  IS_DRAGGING, INGREDIENTS_REPLACE, CLEAR_BURGER, 
  ORDER_NUMBER_REQUEST, ORDER_NUMBER_SUCCESS, ORDER_NUMBER_FAILED,
  IS_REQUESTING, IS_SUCCESS, IS_FAILED, SET_USER, SET_AUTH_CHECKED
 } from '../constants';

import { TIngredientItem, TServerResponse, TIngredientsResponse, TOrderResponse, TRefreshResponse, TUser, TUserResponse  } from '../../utils/types';

/*Ingredients interface & Actions*/

export interface IGetIngredientsAction {
  readonly type: typeof INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
  readonly type: typeof INGREDIENTS_SUCCESS;
  readonly data: Array<TIngredientItem | null>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof INGREDIENTS_FAILED;
}

export interface ICurrentIngredientAction {
  readonly type: typeof OPEN_INGREDIENT;
  readonly currentIngredient: TIngredientItem | null;
}

export interface ICloseIngredientsAction {
  readonly type: typeof CLOSE_INGREDIENT;
}

export interface IIsDraggingAction {
  readonly type: typeof IS_DRAGGING;
  readonly isDraggingBun: boolean;
  readonly isDraggingIng: boolean;
}

export type TIngredientsAction =
  | IGetIngredientsAction 
  | IGetIngredientsSuccessAction 
  | IGetIngredientsFailedAction 
  | ICurrentIngredientAction
  | ICloseIngredientsAction 
  | IIsDraggingAction

export const IngredientsRequestAction = (): IGetIngredientsAction => ({
  type: INGREDIENTS_REQUEST,
})

export const IngredientsSuccessAction = (data: Array<TIngredientItem | null>): IGetIngredientsSuccessAction => ({
  type: INGREDIENTS_SUCCESS,
  data: data
})

export const IngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: INGREDIENTS_FAILED,
})

export const CurrentIngredientAction = (currentIngredient: TIngredientItem | null): ICurrentIngredientAction => ({
  type: OPEN_INGREDIENT,
  currentIngredient: currentIngredient
})

export const closeIngredientAction = (): ICloseIngredientsAction => ({
  type: CLOSE_INGREDIENT,
})

export const IsDraggingAction = (isDraggingBun: boolean, isDraggingIng: boolean): IIsDraggingAction => ({
  type: IS_DRAGGING,
  isDraggingBun: isDraggingBun,
  isDraggingIng: isDraggingIng
})


/*Burger Interfaces & Actions*/

  export interface IAddItemAction {
    readonly type: typeof ADD_INGREDIENT_TO_BURGER;
    readonly payload: {
      item: TIngredientItem,
      ingredientType: string
    };
  }

  export interface IRemoveItemAction {
    readonly type: typeof REMOVE_INGREDIENT_FROM_BURGER;
    readonly payload: {
      item: TIngredientItem
    };
  }

  export interface IReplaceItemsAction{
    readonly type: typeof INGREDIENTS_REPLACE;
    readonly payload: { 
        dragIndex: number;
        hoverIndex: number;
    };
  }

  export interface IClearBurgerAction {
    readonly type: typeof CLEAR_BURGER
  }

  export interface IOrderNumberRequestAction {
    readonly type: typeof ORDER_NUMBER_REQUEST
  }

  export interface IOrderNumberSuccessAction {
    readonly type: typeof ORDER_NUMBER_SUCCESS;
    readonly payload: { 
      orderNumber: number 
    } 
  }
  export interface IOrderNumberFailedAction {
    readonly type: typeof ORDER_NUMBER_FAILED
  }

  export type TBurgerAction =
  | IAddItemAction
  | IRemoveItemAction
  | IReplaceItemsAction
  | IClearBurgerAction
  | IOrderNumberRequestAction
  | IOrderNumberSuccessAction
  | IOrderNumberFailedAction

  //добавление ингредиента
  export const AddItemAction = (item: TIngredientItem, ingredientType: string): IAddItemAction => ({
    type: ADD_INGREDIENT_TO_BURGER,
    payload: { 
      item: {
        ...item, 
        uniqkey: nanoid()
      },
      ingredientType: ingredientType
    }
  })

 //удаление ингредиента
 export const RemoveItemAction = (item: TIngredientItem): IRemoveItemAction => ({
    type: REMOVE_INGREDIENT_FROM_BURGER,
    payload: { 
      item
    }
  })

//сортировка dnd
export const ReplaceItemsAction = (dragIndex: number, hoverIndex: number): IReplaceItemsAction  => ({
    type: INGREDIENTS_REPLACE,
    payload: {
      dragIndex: dragIndex,
      hoverIndex: hoverIndex
    }
  })

  //очистка бургера
  export const ClearBurgerAction = (): IClearBurgerAction => ({
    type: CLEAR_BURGER,
  })

  export const OrderNumberRequestAction = (): IOrderNumberRequestAction => ({
    type: ORDER_NUMBER_REQUEST,
  })

  export const OrderNumberSuccessAction = (orderNumber: number): IOrderNumberSuccessAction  => ({
    type: ORDER_NUMBER_SUCCESS,
    payload: {
      orderNumber: orderNumber
    }
  })
 export const OrderNumberFailedAction = (): IOrderNumberFailedAction => ({
    type: ORDER_NUMBER_FAILED,
  })

/*User Interfaces & Actions*/
  
  export interface IUserSetAuthAction {
    readonly type: typeof SET_AUTH_CHECKED;
    readonly isAuthChecked: boolean
  }

  export interface ISetUserAction {
    readonly type: typeof SET_USER;
    readonly user: TUser | null;
  }

  export interface IIsRequestingAction {
    readonly type: typeof IS_REQUESTING;
  }

  export interface IIsSuccessAction {
    readonly type: typeof IS_SUCCESS;
  }

  export interface IIsFailedAction {
    readonly type: typeof IS_FAILED;
  }
export type TUserAction =
  | IUserSetAuthAction
  | ISetUserAction
  | IIsRequestingAction
  | IIsSuccessAction
  | IIsFailedAction

  export const UserSetAuthAction = (isAuthChecked: boolean): IUserSetAuthAction => ({
    type: SET_AUTH_CHECKED,
    isAuthChecked: isAuthChecked
  })

  export const SetUserAction = (user: TUser | null): ISetUserAction => ({
    type: SET_USER,
    user: user
  })

  export const IsRequestingAction = (): IIsRequestingAction => ({
    type: IS_REQUESTING
  })

  export const IsSuccessAction = (): IIsSuccessAction => ({
    type: IS_SUCCESS
  })

  export const IsFailedAction = (): IIsFailedAction => ({
    type: IS_FAILED
  })

//Получение данных ингредиентов
export function getIngredients(): AppThunkAction {
  return function(dispatch: AppDispatch) {

    dispatch(IngredientsRequestAction)

    request('ingredients', {})
    .then(checkResponse<TIngredientsResponse>)
    .then(res => { 
      dispatch(IngredientsSuccessAction(res.data))
    })
    .catch((err: Error) => {
      dispatch(IngredientsFailedAction);
      console.error('Error: ' + err.message);
    });
  }
}

//создание заказа
export function getOrderNumber(ids: string[]): AppThunkAction {
  return function(dispatch: AppDispatch) {
    
    dispatch(OrderNumberRequestAction);

    return fetchWithRefresh<TOrderResponse>('orders', { 
      method: 'POST', 
      headers: headers("auth"), 
      body: JSON.stringify({ 'ingredients': ids})
    })
    .then(result => { 
      if (result && result.order && result.order.number) {
        dispatch(OrderNumberSuccessAction(result.order.number))
      }
    })
    .catch((err: Error) => {
      dispatch(OrderNumberFailedAction)
      console.error('Error: ' + err.message);
    });
  }
}

//рефреш токенов
export function refreshTokens(): AppThunkAction {
  return function(dispatch: AppDispatch) {
    const refreshtoken = localStorage.getItem('refreshToken') || null;

    if (refreshtoken) {

      request('auth/token', { 
        method: 'POST', 
        headers: headers(),
        body: JSON.stringify({ token: refreshtoken })
      })
      .then(checkResponse<TRefreshResponse>)
      .then(result => {
        if (result.success) {
          localStorage.setItem('accessToken', result.accessToken);
          localStorage.setItem('refreshToken', result.refreshToken);
        } else {
          throw new Error("Ошибка refreshTokens");
        }
      })
      .catch((err: Error) => {
        dispatch(IsFailedAction);
      })
    }
    else
    {
      dispatch(IsFailedAction);
    }
  }
}

//проверка пользователя с accesstoken (при наличии)
export function checkUserAuth(): AppThunkAction {
  return function(dispatch: AppDispatch) {
    
    const accesstoken = localStorage.getItem('accessToken') || null;

    if (accesstoken) {

      dispatch(IsRequestingAction);

      fetchWithRefresh<TUserResponse>('auth/user', {
        method: "GET",
        headers: headers("auth")
      })
      .then(result => { 
        if (result && result.success) {
          dispatch(SetUserAction(result.user))
        }
        else {
          throw new Error("Ошибка метода checkUserAuth");
        }
      })
      .catch((err: Error) => {
        dispatch(IsFailedAction);
        console.error('Error: ' + err.message);
      })
      .finally(() => {
        
        dispatch(UserSetAuthAction(true));
      });
    }
    else {
      dispatch(UserSetAuthAction(true));
    }
  }
}

//регистрация
export function register(formData: TUser) {
  return function(dispatch: AppDispatch) {
 
    dispatch(IsRequestingAction);

    return request('auth/register', {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(formData)
    })
    .then(checkResponse<TUserResponse & TRefreshResponse>)
    .then(result => {

      if (result && result.success) {

        localStorage.setItem("refreshToken", result.refreshToken);
        localStorage.setItem("accessToken", result.accessToken);

        dispatch(SetUserAction(result.user));

      } else {
        throw new Error("Ошибка метода register");
      }
    })
    .catch((err: Error) => {
      dispatch(IsFailedAction);
      throw err;
    });

  }
}

//логин
export function login(formData: TUser) {
  return function(dispatch: AppDispatch) {
 
    dispatch(IsRequestingAction);

    return request('auth/login', {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(formData)
    })
    .then(checkResponse<TUserResponse & TRefreshResponse>)
    .then(result => {

      if (result && result.success) {
        
        localStorage.setItem("refreshToken", result.refreshToken);
        localStorage.setItem("accessToken", result.accessToken);
       
        dispatch(SetUserAction(result.user));
       
        dispatch(IsSuccessAction);
     
      } else {
        throw new Error("Ошибка метода login");
      }
    })
    .catch((err: Error) => {
      dispatch(IsFailedAction);
      throw err;
    });

  }
}

//логаут
export function logout() {
  return function(dispatch: AppDispatch) {
 
    dispatch(IsRequestingAction);

    return fetchWithRefresh<TServerResponse<boolean>>('auth/logout', {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
    .then(result => {

      if (result && result.success) {
        
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
       
        dispatch(SetUserAction(null));
       
        dispatch(IsSuccessAction);
     
      } else {
        throw new Error("Ошибка метода logout");
      }
    })
    .catch((err: Error) => {
      dispatch(IsFailedAction);
      throw err;
    });

  }
}

//изменение пользователя
export function changeUser(formData: TUser) {
  return function(dispatch: AppDispatch) {
 
    dispatch(IsRequestingAction);

   /*  return new Promise((resolve, reject) => {
       dispatch(IsSuccessAction);
      reject({message: "my error"});
    }); */

   return fetchWithRefresh<TUserResponse>('auth/user', {
     method: "PATCH",
     headers: headers("auth"),
     body: JSON.stringify(formData)
   })
   .then((result) => {
     if (result && result.success) {

      dispatch(SetUserAction(result.user));

     } else {
       throw new Error("Ошибка метода changeUser");
     }
   })
   .catch((err: Error) => {
    dispatch(IsFailedAction);
     throw err;
   });

  }
}

//забыл пароль
export function forgotPassword(formData: TUser) {
  return function(dispatch: AppDispatch) {
 
    dispatch(IsRequestingAction);

    return request('password-reset', {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(formData)
    })
    .then(checkResponse<TUserResponse>)
    .then(result => {

      if (result && result.success) {
        dispatch(IsSuccessAction);
        return result;
      } else {
        throw new Error("Ошибка метода forgotPassword");
      }
    })
    .catch((err: Error) => {
      dispatch(IsFailedAction);
      throw err;
    });
  }
}

//сбросить пароль
export function resetPassword(formData: TUser) {
  return function(dispatch: AppDispatch) {
 
    dispatch(IsRequestingAction);

    return request('password-reset/reset', {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(formData)
    })
    .then(checkResponse<TUserResponse>)
    .then(result => {
      
      if (result && result.success) {
        dispatch(IsSuccessAction);
        return result;
      } else {
        throw new Error("Ошибка метода resetPassword");
      }
    })
    .catch((err: Error) => {
      dispatch(IsFailedAction);
      throw err;
    });

  }
}