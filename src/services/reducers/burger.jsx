import { ADD_INGREDIENT_TO_BURGER, REMOVE_INGREDIENT_FROM_BURGER, INGREDIENTS_REPLACE, CLEAR_BURGER } from '../actions';
import { nanoid } from '@reduxjs/toolkit'
import update from 'immutability-helper';

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
        
        if (action.ingredientType === 'bun') {

            return {
                ...state,
                bun: {
                    ...action.item, 
                    uniqkey: nanoid()
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
                        ...action.item, 
                        uniqkey: nanoid()
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
        return {
            ...state,
            burgerIngredients: [...update(state.burgerIngredients, {
              $splice: [
                [action.payload.dragIndex, 1],
                [action.payload.hoverIndex, 0, state.burgerIngredients[action.payload.dragIndex]]
              ]
            })]
        }
    }
    case CLEAR_BURGER: {
        return {
            ...state,
            bun: null,
            burgerIngredients: [],
            orderNumber: 0
        }
      }
    
    default: {
      return state;
    }
  }
};