import { initialState, ingredientsReducer } from './ingredients'
import * as types from '../constants';
import * as actions from '../actions';
import * as datatypes from '../../utils/types'

import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import fetchMock from 'fetch-mock'

const mockStore = configureMockStore([thunk])

describe('ingredients reducer', () => {
  
    test('should return the initial state', () => {
      expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    })

    test('should handle INGREDIENTS_REQUEST', () => {
        expect(
          ingredientsReducer({...initialState, itemsRequest: false, itemsFailed: true }, {
            type: types.INGREDIENTS_REQUEST
          })
        ).toEqual({
          ...initialState,
          itemsRequest: true,
          itemsFailed: false
        })
      })
  
    test('should handle INGREDIENTS_SUCCESS', () => {
        expect(
          ingredientsReducer({...initialState, itemsRequest: true, itemsFailed: false }, { 
            type: types.INGREDIENTS_SUCCESS,
            data: [types.bun, types.main]
        })
        ).toEqual({
            ...initialState,
            itemsRequest: false,
            itemsFailed: false,
            listIngredients: [types.bun, types.main]
        })
    })

    test('should handle INGREDIENTS_FAILED', () => {
        expect(
            ingredientsReducer({...initialState, itemsRequest: true, itemsFailed: false, listIngredients: [types.bun, types.main] }, { 
                type: types.INGREDIENTS_FAILED
            })
        ).toEqual({
            ...initialState,
            itemsRequest: false,
            itemsFailed: true,
            listIngredients: []
        })
    })

    test('should handle OPEN_INGREDIENT', () => {
        expect(
            ingredientsReducer({...initialState }, {
                type: types.OPEN_INGREDIENT,
                currentIngredient: types.main
            })
        ).toEqual({
            ...initialState,
            currentIngredient: types.main
        })
    })

    test('should handle CLOSE_INGREDIENT', () => {
        expect(
            ingredientsReducer({...initialState, currentIngredient: types.main }, {
                type: types.CLOSE_INGREDIENT
            })
        ).toEqual({
            ...initialState,
            currentIngredient: null
        })
    })

    test('should handle IS_DRAGGING', () => {
        expect(
            ingredientsReducer({...initialState }, {
                type: types.IS_DRAGGING,
                isDraggingBun: true,
                isDraggingIng: false
            })
        ).toEqual({
            ...initialState,
            isDraggingBun: true,
            isDraggingIng: false
        })
    })
})


describe('async actions', () => {

  afterEach(() => {
    fetchMock.restore()
  })
    /*
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockReturnValue({result: 'OK'}),
        ok: true
      })
    })

    afterEach(() => {
      jest.resetAllMocks();
    })
 

    test('should be successful', async () => {
      const regResult = await actions.register()
    })
 */
    it('creates INGREDIENTS_SUCCESS when fetching ingredients has been done', async () => {

      fetchMock.getOnce(types.protocolHttps + types.baseUrl + "api/ingredients", {
          headers: { 'content-type': 'application/json' }
        })
          
        const expectedSuccessActions = [
            { type: types.INGREDIENTS_REQUEST },
            { type: types.INGREDIENTS_SUCCESS, data: Array[datatypes.TIngredientItem] }
        ]
        const expectedErrorActions = [
          { type: types.INGREDIENTS_FAILED }
      ]

        const store = mockStore({ data: Array[datatypes.TIngredientItem]  })

        return await store.dispatch(actions.getIngredients())
          .then(() => {
            expect([actions.IngredientsRequestAction(), 
                actions.IngredientsSuccessAction()]).toEqual(expectedSuccessActions)
          })
          .catch(() => {
            expect([actions.IngredientsFailedAction()]).toEqual(expectedErrorActions)
          })
    })
    

  }) 
