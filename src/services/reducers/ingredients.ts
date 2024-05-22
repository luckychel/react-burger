import { INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_FAILED, OPEN_INGREDIENT, CLOSE_INGREDIENT, IS_DRAGGING } from '../constants';
import { TIngredientsAction } from '../actions';
import { TIngredientsState } from '../../utils/types';

const initialState: TIngredientsState = {
  itemsRequest: false,
  itemsFailed: false,
  listIngredients: [],
  currentIngredient: null,
  isDraggingBun: false,
  isDraggingIng: false
};

export const ingredientsReducer = (state = initialState, action: TIngredientsAction) => {
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
        currentIngredient: null
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