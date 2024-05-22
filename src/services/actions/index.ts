import { request, fetchWithRefresh, headers, checkResponse } from '../../utils/api';
import { nanoid } from '@reduxjs/toolkit'
import { AppDispatch } from '../store';

import { INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_FAILED, 
  ADD_INGREDIENT_TO_BURGER, REMOVE_INGREDIENT_FROM_BURGER, OPEN_INGREDIENT, CLOSE_INGREDIENT,
  IS_DRAGGING, INGREDIENTS_REPLACE, CLEAR_BURGER, 
  ORDER_NUMBER_REQUEST, ORDER_NUMBER_SUCCESS, ORDER_NUMBER_FAILED,
  IS_REQUESTING, IS_SUCCESS, IS_FAILED, SET_USER, SET_AUTH_CHECKED
 } from '../constants';

import { TIngredientItem, TServerResponse, TIngredientsResponse, TOrderResponse, TRefreshResponse, TUser, TUserResponse  } from '../../utils/types';

/* Actions */
export type TIngredientsAction =
  | { type: typeof INGREDIENTS_REQUEST; }
  | { type: typeof INGREDIENTS_SUCCESS; data: Array<TIngredientItem | null> }
  | { type: typeof INGREDIENTS_FAILED; }
  | { type: typeof OPEN_INGREDIENT; currentIngredient: TIngredientItem | null }
  | { type: typeof CLOSE_INGREDIENT }
  | { type: typeof IS_DRAGGING; isDraggingBun: boolean; isDraggingIng: boolean; }

export type TBurgerAction =
  | { type: typeof ADD_INGREDIENT_TO_BURGER; payload: { item: TIngredientItem, ingredientType: string } }
  | { type: typeof REMOVE_INGREDIENT_FROM_BURGER; payload: { item: TIngredientItem } }
  | { type: typeof INGREDIENTS_REPLACE; payload: { dragIndex: number, hoverIndex: number} }
  | { type: typeof CLEAR_BURGER }
  | { type: typeof ORDER_NUMBER_REQUEST }
  | { type: typeof ORDER_NUMBER_SUCCESS; payload: { orderNumber: number } }
  | { type: typeof ORDER_NUMBER_FAILED };

  export type TUserAction =
  | { type: typeof SET_AUTH_CHECKED; isAuthChecked: boolean; }
  | { type: typeof SET_USER; user: TUser | null; }
  | { type: typeof IS_REQUESTING; }
  | { type: typeof IS_SUCCESS; }
  | { type: typeof IS_FAILED; }

//Получение данных ингредиентов
export const getIngredients = () => {
  return function(dispatch: AppDispatch) {
    
    dispatch({
      type: INGREDIENTS_REQUEST,
    })

    request('ingredients', {})
    .then(checkResponse<TIngredientsResponse>)
    .then(res => { 
      dispatch({
        type: INGREDIENTS_SUCCESS,
        data: res.data
      })
    })
    .catch((err: Error) => {
      dispatch({
        type: INGREDIENTS_FAILED
      });
      console.error('Error: ' + err.message);
    });
  }
}

//добавление ингредиента
export const addItem = (item: TIngredientItem, ingredientType: string) => {
  return {
    type: ADD_INGREDIENT_TO_BURGER,
    payload: { 
      item: {
        ...item, 
        uniqkey: nanoid()
      },
      ingredientType: ingredientType
    }
  }
}

//удаление ингредиента
export const deleteItem = (item: TIngredientItem) => {
  return {
      type: REMOVE_INGREDIENT_FROM_BURGER,
      payload: { 
        item
      }
    }
}

//перетаскивание
export const dragging = (isDraggingBun: boolean, isDraggingIng: boolean) => {
  return {
    type: IS_DRAGGING,
    isDraggingBun: isDraggingBun,
    isDraggingIng: isDraggingIng,
  }
}


//сортировка dnd
export const replaceItems = (dragIndex: number, hoverIndex: number) => {
  return {
    type: INGREDIENTS_REPLACE,
    payload: {
      dragIndex: dragIndex,
      hoverIndex: hoverIndex
    }
  }
}

//очистка бургера
export const clearBurger = () => {
  return {
    type: CLEAR_BURGER,
  }
}

//создание заказа
export function getOrderNumber(ids: string[]) {
  return function(dispatch: AppDispatch) {
    
    dispatch({
      type: ORDER_NUMBER_REQUEST,
    });

    return fetchWithRefresh('orders', { 
      method: 'POST', 
      headers: headers("auth"), 
      body: JSON.stringify({ 'ingredients': ids})
    })
    .then(checkResponse<TOrderResponse>)
    .then(result => { 
      if (result && result.order && result.order.number) {
        dispatch({
          type: ORDER_NUMBER_SUCCESS,
          payload: {
            orderNumber: result.order.number
          }
        })
      }
    })
    .catch((err: Error) => {
      dispatch({
        type: ORDER_NUMBER_FAILED
      })
      console.error('Error: ' + err.message);
    });
  }
}

//рефреш токенов
export function refreshTokens() {
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
        dispatch({ type: IS_FAILED });
      })
    }
    else
    {
      dispatch({ type: IS_FAILED });
    }
  }
}

//проверка пользователя с accesstoken (при наличии)
export function checkUserAuth() {
  return function(dispatch: AppDispatch) {
    
    const accesstoken = localStorage.getItem('accessToken') || null;

    if (accesstoken) {

      dispatch({ type: IS_REQUESTING });

      fetchWithRefresh('auth/user', {
        method: "GET",
        headers: headers("auth")
      })
      .then(checkResponse<TUserResponse>)
      .then(result => { 
        if (result && result.success) {
          dispatch({
            type: SET_USER,
            user: result.user
          })
        }
        else {
          throw new Error("Ошибка метода checkUserAuth");
        }
      })
      .catch((err: Error) => {
        dispatch({
          type: IS_FAILED
        })
        console.error('Error: ' + err.message);
      })
      .finally(() => {
        dispatch({
          type: SET_AUTH_CHECKED,
          isAuthChecked: true
        });
      });
    }
    else {
      dispatch({
        type: SET_AUTH_CHECKED,
        isAuthChecked: true
      });
    }
  }
}

//регистрация
export function register(formData: TUser) {
  return function(dispatch: AppDispatch) {
 
    dispatch({ type: IS_REQUESTING });

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

        dispatch({
          type: SET_USER,
          user: result.user
        });

      } else {
        throw new Error("Ошибка метода register");
      }
    })
    .catch((err: Error) => {
      dispatch({ type: IS_FAILED});
      throw err;
    });

  }
}

//логин
export function login(formData: TUser) {
  return function(dispatch: AppDispatch) {
 
    dispatch({ type: IS_REQUESTING });

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
       
        dispatch({
          type: SET_USER,
          user: result.user
        });
       
        dispatch({ type: IS_SUCCESS});
     
      } else {
        throw new Error("Ошибка метода login");
      }
    })
    .catch((err: Error) => {
      dispatch({ type: IS_FAILED});
      throw err;
    });

  }
}

//логаут
export function logout() {
  return function(dispatch: AppDispatch) {
 
    dispatch({ type: IS_REQUESTING });

    return fetchWithRefresh('auth/logout', {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
    .then(checkResponse<TServerResponse<boolean>>)
    .then(result => {

      if (result && result.success) {
        
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
       
        dispatch({
          type: SET_USER,
          user: null
        });
       
        dispatch({ type: IS_SUCCESS});
     
      } else {
        throw new Error("Ошибка метода logout");
      }
    })
    .catch((err: Error) => {
      dispatch({ type: IS_FAILED});
      throw err;
    });

  }
}

//изменение пользователя
export function changeUser(formData: TUser) {
  return function(dispatch: AppDispatch) {
 
    dispatch({ type: IS_REQUESTING });

   /*  return new Promise((resolve, reject) => {
      dispatch({ type: IS_SUCCESS});
      reject({message: "my error"});
    }); */

   return fetchWithRefresh('auth/user', {
     method: "PATCH",
     headers: headers("auth"),
     body: JSON.stringify(formData)
   })
   .then(checkResponse<TUserResponse>)
   .then(result => {

     if (result && result.success) {
       dispatch({
         type: SET_USER,
         user: result.user
       });

     } else {
       throw new Error("Ошибка метода changeUser");
     }
   })
   .catch((err: Error) => {
     dispatch({ type: IS_FAILED});
     throw err;
   });

  }
}

//забыл пароль
export function forgotPassword(formData: TUser) {
  return function(dispatch: AppDispatch) {
 
    dispatch({ type: IS_REQUESTING });

    return request('password-reset', {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(formData)
    })
    .then(checkResponse<TUserResponse>)
    .then(result => {

      if (result && result.success) {
        dispatch({type: IS_SUCCESS});
        return result;
      } else {
        throw new Error("Ошибка метода forgotPassword");
      }
    })
    .catch((err: Error) => {
      dispatch({ type: IS_FAILED});
      throw err;
    });
  }
}

//сбросить пароль
export function resetPassword(formData: TUser) {
  return function(dispatch: AppDispatch) {
 
    dispatch({ type: IS_REQUESTING });

    return request('password-reset/reset', {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(formData)
    })
    .then(checkResponse<TUserResponse>)
    .then(result => {
      
      if (result && result.success) {
        dispatch({type: IS_SUCCESS});
        return result;
      } else {
        throw new Error("Ошибка метода resetPassword");
      }
    })
    .catch((err: Error) => {
      dispatch({ type: IS_FAILED});
      throw err;
    });

  }
}