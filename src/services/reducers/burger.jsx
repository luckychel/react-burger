import { 
    INGREDIENTS_REQUEST, 
    INGREDIENTS_SUCCESS,
    INGREDIENTS_FAILED,
    
    OPEN_INGREDIENT,
    CLOSE_INGREDIENT

  } from '../actions';
  
  const initialState = {
    itemsRequest: false,
    itemsFailed: false,
    ingredients: [],
    constructorIngredients: [],
    currentIngredient: {},
    orderNumber: 0
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
          ingredients: action.data
        }
      }
      case INGREDIENTS_FAILED: {
        return {
          ...state,
          itemsRequest: false,
          itemsFailed: true,
          ingredients: []
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
      
      default: {
        return state;
      }
    }
  };