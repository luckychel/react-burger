import { burgerReducer } from './burger'
import * as types from '../constants';


const initialState = {
    itemsRequest: false,
    itemsFailed: false,
    bun: null,
    burgerIngredients: [],
    orderNumber: 0
  };

const bun = {
  "_id":"60666c42cc7b410027a1a9b1",
  "name":"Краторная булка N-200i",
  "type":"bun",
  "proteins":80,
  "fat":24,
  "carbohydrates":53,
  "calories":420,
  "price":1255,
  "image":"https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v":0,
  "uniqkey": "bunitem1"
};

const main = {
  "_id":"60666c42cc7b410027a1a9b5",
  "name":"Говяжий метеорит (отбивная)",
  "type":"main",
  "proteins":800,
  "fat":800,
  "carbohydrates":300,
  "calories":2674,
  "price":3000,
  "image":"https://code.s3.yandex.net/react/code/meat-04.png",
  "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
  "__v":0,
  "uniqkey": "mainitem1"
};

describe('burger reducer', () => {
  
  test('should return the initial state', () => {
    expect(burgerReducer(undefined, {})).toEqual(initialState)
  })

  test('should handle ADD_INGREDIENT_TO_BURGER', () => {
    expect(
       burgerReducer(initialState, {
        type: types.ADD_INGREDIENT_TO_BURGER,
        payload: { 
            item: bun,
            ingredientType: "bun"
        }
      })
    ).toEqual({
        ...initialState,
        bun: bun
      }
    )

    expect(
        burgerReducer(initialState, {
         type: types.ADD_INGREDIENT_TO_BURGER,
         payload: { 
             item: main,
             ingredientType: "main"
         }
       })
     ).toEqual({
        ...initialState,
        burgerIngredients: [main]
      })
  })

  test('should handle REMOVE_INGREDIENT_FROM_BURGER', () => {
    expect(
       burgerReducer({...initialState, burgerIngredients: [bun, main] }, {
        type: types.REMOVE_INGREDIENT_FROM_BURGER,
        payload: { 
          item: main
        }
      })
    ).toEqual({
      ...initialState,
      burgerIngredients: [bun]
    })
  })

  test('should handle INGREDIENTS_REPLACE', () => {
    expect(
       burgerReducer({...initialState, burgerIngredients: [bun, main] }, {
        type: types.INGREDIENTS_REPLACE,
        payload: { 
          dragIndex: 1,
          hoverIndex: 0
        }
      })
    ).toEqual({
      ...initialState,
      burgerIngredients: [main, bun]
    })
  })

  test('should handle CLEAR_BURGER', () => {
    expect(
      burgerReducer({...initialState, bun: bun, burgerIngredients: [main] }, {
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