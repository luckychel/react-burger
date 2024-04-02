import { ADD_INGREDIENT_TO_BURGER, REMOVE_INGREDIENT_FROM_BURGER, INGREDIENTS_REPLACE } from '../actions';
import { nanoid } from '@reduxjs/toolkit'
  
  const initialState = {
    itemsRequest: false,
    itemsFailed: false,
    burgerIngredients: [],
    orderNumber: 0
  };

export const burgerReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_INGREDIENT_TO_BURGER: {
      return {
        ...state,
        burgerIngredients: [...state.burgerIngredients,  { ...action.draggedIngredient, uniqkey: nanoid() }]
      }
    }
    case REMOVE_INGREDIENT_FROM_BURGER: {      
      let findDeleteItemIndex = state.burgerIngredients.map(item => action.ingredientType === "bun" ? item._id : item.uniqkey).indexOf(action.id);
        
      return {
        ...state,
        burgerIngredients: state.burgerIngredients.filter((item,index) => index !== findDeleteItemIndex )
      }
    }
    case INGREDIENTS_REPLACE: {
      
      const replacedIngredients = [...state.burgerIngredients];
      const draggedIngredient = replacedIngredients[action.payload.dragIndex];
      replacedIngredients.splice(action.payload.dragIndex, 1);
      replacedIngredients.splice(action.payload.hoverIndex, 0, draggedIngredient);
    
      return {
          ...state,
          burgerIngredients: replacedIngredients
      }
    }

    default: {
      return state;
    }
  }
};