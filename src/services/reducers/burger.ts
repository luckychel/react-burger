import { ADD_INGREDIENT_TO_BURGER, REMOVE_INGREDIENT_FROM_BURGER, INGREDIENTS_REPLACE, CLEAR_BURGER,
  CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED } from '../constants';
import { TBurgerAction } from '../actions';
import { TBurgerState } from '../../utils/types';

export const initialState: TBurgerState = {
  itemsRequest: false,
  itemsFailed: false,
  bun: null,  //для булки
  burgerIngredients: [], // для остального
  orderNumber: 0
};

export const burgerReducer = (state = initialState, action: TBurgerAction): TBurgerState => {
  switch(action.type) {
    case ADD_INGREDIENT_TO_BURGER: {
        if (action.payload.ingredientType === 'bun') {
            return {
                ...state,
                bun: {
                    ...action.payload.item
                }
            }
        }
        else {
            return {
                ...state,
                burgerIngredients: 
                [   
                    ...state.burgerIngredients,  
                    {
                        ...action.payload.item
                    }
                ]
            }
        }
    }
    case REMOVE_INGREDIENT_FROM_BURGER: {    
        
      return {
        ...state,
        burgerIngredients: state.burgerIngredients.filter((x) => x !== null && x.uniqkey !== action.payload.item.uniqkey)
      }
    }
    case INGREDIENTS_REPLACE: {
        const dragItem = state.burgerIngredients[action.payload.dragIndex];
        const newArr = [...state.burgerIngredients];
        newArr.splice(action.payload.dragIndex, 1);
        newArr.splice(action.payload.hoverIndex, 0, dragItem);
        return {
            ...state,
            burgerIngredients: newArr
        }
    }
    case CLEAR_BURGER: {
        return {
            ...state,
            bun: null,
            burgerIngredients: []
        }
      }
      
      case CREATE_ORDER_REQUEST: {
        return {
          ...state,
          itemsRequest: true,
          itemsFailed: false,
          orderNumber: 0
        }
      }
      case CREATE_ORDER_SUCCESS: {
        return {
          ...state,
          itemsRequest: false,
          itemsFailed: false,
          orderNumber: action.payload.orderNumber
        }
      }
      case CREATE_ORDER_FAILED: {
        return {
          ...state,
          itemsRequest: false,
          itemsFailed: true,
          orderNumber: 0
        }
      }
    default: {
      return state;
    }
  }
};