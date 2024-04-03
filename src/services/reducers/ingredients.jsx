import { INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_FAILED, OPEN_INGREDIENT, CLOSE_INGREDIENT, IS_DRAGGING } from '../actions';
  
  const initialState = {
    itemsRequest: false,
    itemsFailed: false,
    listIngredients: [],
    currentIngredient: {},
    isDragging: false
  };
 
  export const ingredientsReducer = (state = initialState, action) => {
    switch(action.type) {
      case INGREDIENTS_REQUEST: {
        return {
          ...state,
          itemsRequest: true,
          itemsFailed: false
        }
      }
      case INGREDIENTS_SUCCESS: {
        return {
          ...state,
          itemsRequest: false,
          itemsFailed: false,
          listIngredients: action.data
        }
      }
      case INGREDIENTS_FAILED: {
        return {
          ...state,
          itemsRequest: false,
          itemsFailed: true,
          listIngredients: []
        }
      }
      case OPEN_INGREDIENT: {
        return {
          ...state,
          currentIngredient: action.currentIngredient
        }
      }
      case CLOSE_INGREDIENT: {
        return {
          ...state,
          currentIngredient: {}
        }
      }
      case IS_DRAGGING: {
        return {
          ...state,
          isDraggingBun: action.isDraggingBun,
          isDraggingIng: action.isDraggingIng
        }
      }
      
      default: {
        return state;
      }
    }
  };