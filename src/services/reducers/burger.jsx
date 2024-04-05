import { ADD_INGREDIENT_TO_BURGER, REMOVE_INGREDIENT_FROM_BURGER, INGREDIENTS_REPLACE, CLEAR_BURGER,
        ORDER_NUMBER_REQUEST, ORDER_NUMBER_SUCCESS, ORDER_NUMBER_FAILED } from '../actions';
//import update from 'immutability-helper';

  const initialState = {
    itemsRequest: false,
    itemsFailed: false,
    bun: null,  //для булки
    burgerIngredients: [], // для остального
    orderNumber: 0
  };

export const burgerReducer = (state = initialState, action) => {
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
        burgerIngredients:  state.burgerIngredients.filter((x) => x.uniqkey !== action.item.uniqkey)
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
            //burgerIngredients: [update(state.burgerIngredients, {
            //  $splice: [
            //    [action.payload.dragIndex, 1],
            //    [action.payload.hoverIndex, 0, state.burgerIngredients[action.payload.dragIndex]]
            //  ]
            //})]
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
          itemsFailed: false
        }
      }
      case ORDER_NUMBER_SUCCESS: {
        return {
          ...state,
          itemsRequest: false,
          itemsFailed: false,
          orderNumber: action.orderNumber
        }
      }
      case ORDER_NUMBER_FAILED: {
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