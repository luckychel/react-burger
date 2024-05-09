import { request, fetchWithRefresh } from '../../utils/api';
import { nanoid } from '@reduxjs/toolkit'
import { AppDispatch } from '../store';

import { INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_FAILED, 
  ADD_INGREDIENT_TO_BURGER, REMOVE_INGREDIENT_FROM_BURGER, 
  IS_DRAGGING, INGREDIENTS_REPLACE, CLEAR_BURGER, 
  ORDER_NUMBER_REQUEST, ORDER_NUMBER_SUCCESS, ORDER_NUMBER_FAILED,
  IS_REQUESTING, IS_SUCCESS, IS_FAILED, SET_USER, SET_AUTH_CHECKED
 } from '../constants';

import { TIngredientItem, TUser, IResponse, IOrder } from '../../utils/types';

/* Actions */

//Получение данных ингредиентов
export const getIngredients = () => {
  return function(dispatch: AppDispatch) {
    
    dispatch({
      type: INGREDIENTS_REQUEST,
    })

    request('ingredients', {})
    .then((result: IResponse<TIngredientItem>) => { 
      dispatch({
        type: INGREDIENTS_SUCCESS,
        data: result.data
      })
    })
    .catch(e => {
      dispatch({
        type: INGREDIENTS_FAILED
      });
      console.error('Error: ' + e.message);
    });
  }
}

//добавление ингредиента
export const addItem = (item: TIngredientItem, ingredientType: string) => {
  return {
    type: ADD_INGREDIENT_TO_BURGER,
    payload: { 
      ingredientType: ingredientType,
      item: {
        ...item, 
        uniqkey: nanoid()
      }
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
export function getOrderNumber(ids: string[] = []) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: ORDER_NUMBER_REQUEST,
    });
    return fetchWithRefresh('orders', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json;charset=utf-8' ,
        "Authorization": localStorage.getItem('accessToken') || null
      }, 
      body: JSON.stringify({ 'ingredients': ids})
    })
    .then((result: IResponse<IOrder>) => { 
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshtoken })
      })
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
        headers: {
          "Content-Type": "application/json",
          "Authorization": accesstoken
        }
      })
      .then((result: IResponse<TUser>) => { 
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((result: IResponse<TUser>) => {

      if (result && result.success) {

        localStorage.setItem("refreshToken", result.refreshToken || "");
        localStorage.setItem("accessToken", result.accessToken || "");

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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((result: IResponse<TUser>) => {

      if (result && result.success) {
        
        localStorage.setItem("refreshToken", result.refreshToken || "");
        localStorage.setItem("accessToken", result.accessToken || "");
       
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
    .then((result: IResponse<TUser>) => {

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
     headers: {
       'Content-Type': 'application/json',
       "Authorization": localStorage.getItem('accessToken') || null
     },
     body: JSON.stringify(formData)
   })
   .then((result: IResponse<TUser>) => {

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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((result: IResponse<TUser>) => {
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((result: IResponse<TUser>) => {
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