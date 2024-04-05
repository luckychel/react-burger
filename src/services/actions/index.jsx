import { request } from '../../utils/api';
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
