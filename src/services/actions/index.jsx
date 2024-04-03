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


/* Actions */
const baseUrl = 'https://norma.nomoreparties.space/api/';

//Получение данных ингредиентов
export const getIngredients = () => {
  return function(dispatch) {
    dispatch({
      type: INGREDIENTS_REQUEST,
    })
    fetch(baseUrl + 'ingredients')
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      dispatch({
        type: INGREDIENTS_SUCCESS,
        data: data.data
      })
    })
    .catch(err => {
      dispatch({
        type: INGREDIENTS_FAILED
      });
      console.log(`Ошибка: ${err.message}`);
    });
  }
}

//добавление ингредиента
export const addItem = (item, ingredientType) => {
  return function(dispatch) {
    dispatch({
        type: ADD_INGREDIENT_TO_BURGER,
        item,
        ingredientType
      })
  }
}

//удаление ингредиента
export const deleteItem = (item) => {
  return function(dispatch) {
    dispatch({
        type: REMOVE_INGREDIENT_FROM_BURGER,
        item
      })
  }
}

//сортировка dnd
export const replaceItems = (dragIndex, hoverIndex) => {
  return function(dispatch) {
    dispatch({
      type: INGREDIENTS_REPLACE,
      payload: {
        dragIndex: dragIndex,
        hoverIndex: hoverIndex
      }
    })
  }
}

//очистка бургера
export const clearBurger = () => {
  return function(dispatch) {
    dispatch({
        type: CLEAR_BURGER,
      })
  }
}
