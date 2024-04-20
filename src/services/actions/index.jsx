import { request, fetchWithRefresh } from '../../utils/api';
import { nanoid } from '@reduxjs/toolkit'

/* Ингредиенты */
export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_SUCCESS = 'INGREDIENTS_SUCCESS';
export const INGREDIENTS_FAILED = 'INGREDIENTS_FAILED';

export const OPEN_INGREDIENT = 'OPEN_INGREDIENT';
export const CLOSE_INGREDIENT = 'CLOSE_INGREDIENT';
export const IS_DRAGGING = 'IS_DRAGGING'; 

/* Бургер */
export const ADD_INGREDIENT_TO_BURGER = 'ADD_INGREDIENT_TO_BURGER';
export const REMOVE_INGREDIENT_FROM_BURGER = 'REMOVE_INGREDIENT_FROM_BURGER';
export const CLEAR_BURGER = 'CLEAR_BURGER';
export const INGREDIENTS_REPLACE = 'INGREDIENTS_REPLACE';

/* Заказ */
export const ORDER_NUMBER_REQUEST = 'ORDER_NUMBER_REQUEST';
export const ORDER_NUMBER_SUCCESS = 'ORDER_NUMBER_SUCCESS';
export const ORDER_NUMBER_FAILED = 'ORDER_NUMBER_FAILED';

/* Пользователь */

export const IS_REQUESTING = 'IS_REQUESTING';
export const IS_SUCCESS = 'IS_SUCCESS';
export const IS_FAILED = 'IS_FAILED';


export const SET_AUTH_CHECKED = 'USER_REQUEST';
export const SET_USER = 'SET_USER';
export const USER_REQUEST = 'USER_REQUEST';
export const USER_REQUEST_SUCCESS = 'USER_REQUEST_SUCCESS';
export const USER_REQUEST_FAILED = 'USER_REQUEST_FAILED';

/* Actions */

//Получение данных ингредиентов
export const getIngredients = () => {
  return function(dispatch) {
    dispatch({
      type: INGREDIENTS_REQUEST,
    })
    request('ingredients', {})
    .then(data => { 
      dispatch({
        type: INGREDIENTS_SUCCESS,
        data: data.data
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
export const addItem = (item, ingredientType) => {
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
export const deleteItem = (item) => {
  return {
      type: REMOVE_INGREDIENT_FROM_BURGER,
      item
    }
}

//сортировка dnd
export const replaceItems = (dragIndex, hoverIndex) => {
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
export function getOrderNumber(ids) {
  return function(dispatch) {
    dispatch({
      type: ORDER_NUMBER_REQUEST,
    });
    request('orders', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json;charset=utf-8' }, 
      body: JSON.stringify({ 'ingredients': ids})
    })
    .then(data => { 
      if (data && data.order && data.order.number) {
        dispatch({
          type: ORDER_NUMBER_SUCCESS,
          orderNumber: data.order.number
        })
      }
    })
    .catch(e => {
      dispatch({
        type: ORDER_NUMBER_FAILED
      })
      console.error('Error: ' + e.message);
    });
  }
}

export function refreshTokens() {
  return function(dispatch) {
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
      .catch(err => {
        dispatch({ type: IS_FAILED });
      })
    }
    else
    {
      dispatch({ type: IS_FAILED });
    }
  }
}


export function checkUserAuth() {
  return function(dispatch) {
    
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
      .catch(e => {
        dispatch({
          type: USER_REQUEST_FAILED
        })
        console.error('Error: ' + e.message);
      })
      .finally(() => {
        dispatch({
          type: SET_AUTH_CHECKED,
          isAuthChecked: true
        });
      });
    }
    else {
      //setTimeout(function() {
        dispatch({
          type: SET_AUTH_CHECKED,
          isAuthChecked: true
        });
      //}, 5000);
    }
  }
}

export function register(formData) {
  return function(dispatch) {
 
    dispatch({ type: IS_REQUESTING });

    return request('auth/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
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
    .catch(err => {
      dispatch({ type: IS_FAILED});
      throw err;
    });

  }
}

export function login(formData) {
  return function(dispatch) {
 
    dispatch({ type: IS_REQUESTING });

    return request('auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
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
    .catch(err => {
      dispatch({ type: IS_FAILED});
      throw err;
    });

  }
}


export function logout() {
  return function(dispatch) {
 
    dispatch({ type: IS_REQUESTING });

    return fetchWithRefresh('auth/logout', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
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
    .catch(err => {
      dispatch({ type: IS_FAILED});
      throw err;
    });

  }
}