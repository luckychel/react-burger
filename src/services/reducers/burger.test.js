import { initialState, burgerReducer } from './burger'
import * as types from '../constants';


describe('burger reducer', () => {
  
  test('should return the initial state', () => {
    expect(burgerReducer(undefined, {})).toEqual(initialState)
  })

  test('should handle ADD_INGREDIENT_TO_BURGER', () => {
    expect(
       burgerReducer(initialState, {
        type: types.ADD_INGREDIENT_TO_BURGER,
        payload: { 
            item: types.bun,
            ingredientType: "bun"
        }
      })
    ).toEqual({
        ...initialState,
        bun: types.bun
      }
    )

    expect(
        burgerReducer(initialState, {
         type: types.ADD_INGREDIENT_TO_BURGER,
         payload: { 
             item: types.main,
             ingredientType: "main"
         }
       })
     ).toEqual({
        ...initialState,
        burgerIngredients: [types.main]
      })
  })

  test('should handle REMOVE_INGREDIENT_FROM_BURGER', () => {
    expect(
       burgerReducer({...initialState, burgerIngredients: [types.bun, types.main] }, {
        type: types.REMOVE_INGREDIENT_FROM_BURGER,
        payload: { 
          item: types.main
        }
      })
    ).toEqual({
      ...initialState,
      burgerIngredients: [types.bun]
    })
  })

  test('should handle INGREDIENTS_REPLACE', () => {
    expect(
       burgerReducer({...initialState, burgerIngredients: [types.bun, types.main] }, {
        type: types.INGREDIENTS_REPLACE,
        payload: { 
          dragIndex: 1,
          hoverIndex: 0
        }
      })
    ).toEqual({
      ...initialState,
      burgerIngredients: [types.main, types.bun]
    })
  })

  test('should handle CLEAR_BURGER', () => {
    expect(
      burgerReducer({...initialState, bun: types.bun, burgerIngredients: [types.main] }, {
        type: types.CLEAR_BURGER
      })
    ).toEqual({
      ...initialState,
      bun: null,
      burgerIngredients: []
    })
  })

  test('should handle CREATE_ORDER_REQUEST', () => {
    expect(
      burgerReducer({...initialState, itemsRequest: false, itemsFailed: true, orderNumber: 777 }, {
        type: types.CREATE_ORDER_REQUEST
      })
    ).toEqual({
      ...initialState,
      itemsRequest: true,
      itemsFailed: false,
      orderNumber: 0
    })
  })

  test('should handle CREATE_ORDER_SUCCESS', () => {
    expect(
      burgerReducer({...initialState, itemsRequest: true, itemsFailed: false }, {
        type: types.CREATE_ORDER_SUCCESS,
        payload: { 
          orderNumber: 777
        }
      })
    ).toEqual({
      ...initialState,
      itemsRequest: false,
      itemsFailed: false,
      orderNumber: 777
    })
  })

  test('should handle CREATE_ORDER_FAILED', () => {
    expect(
      burgerReducer({...initialState, itemsRequest: true, itemsFailed: false, orderNumber: 777 }, {
        type: types.CREATE_ORDER_FAILED
      })
    ).toEqual({
      ...initialState,
      itemsRequest: false,
      itemsFailed: true,
      orderNumber: 0
    })
  })

})