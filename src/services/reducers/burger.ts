import { ADD_INGREDIENT_TO_BURGER, REMOVE_INGREDIENT_FROM_BURGER, INGREDIENTS_REPLACE, CLEAR_BURGER,
        ORDER_NUMBER_REQUEST, ORDER_NUMBER_SUCCESS, ORDER_NUMBER_FAILED } from '../constants';

import { TIngredientItem } from '../../utils/types';

type TBurgerState = Readonly<{
  itemsRequest: boolean;
  itemsFailed: boolean;
  bun: TIngredientItem | null;
  burgerIngredients: Array<TIngredientItem | null>;
  orderNumber: string;
}>;

const initialState: TBurgerState = {
  itemsRequest: false,
  itemsFailed: false,
  bun: null,  //для булки
  burgerIngredients: [], // для остального
  orderNumber: ""
};

type TBurgerAction =
  | { type: typeof ADD_INGREDIENT_TO_BURGER; payload: { item: TIngredientItem, ingredientType: string } }
  | { type: typeof REMOVE_INGREDIENT_FROM_BURGER; payload: { item: TIngredientItem } }
  | { type: typeof INGREDIENTS_REPLACE; payload: { dragIndex: number, hoverIndex: number} }
  | { type: typeof CLEAR_BURGER }
  | { type: typeof ORDER_NUMBER_REQUEST }
  | { type: typeof ORDER_NUMBER_SUCCESS; payload: { orderNumber: string } }
  | { type: typeof ORDER_NUMBER_FAILED };


export const burgerReducer = (state = initialState, action: TBurgerAction) => {
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
      
      case ORDER_NUMBER_REQUEST: {
        return {
          ...state,
          itemsRequest: true,
          itemsFailed: false,
          orderNumber: null
        }
      }
      case ORDER_NUMBER_SUCCESS: {
        return {
          ...state,
          itemsRequest: false,
          itemsFailed: false,
          orderNumber: action.payload.orderNumber
        }
      }
      case ORDER_NUMBER_FAILED: {
        return {
          ...state,
          itemsRequest: false,
          itemsFailed: true,
          orderNumber: ""
        }
      }
    default: {
      return state;
    }
  }
};