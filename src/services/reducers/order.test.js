import { initialState, orderReducer } from './order'
import * as types from '../constants';
import order from '../../unused/order'

describe('order reducer', () => {
  
    test('should return the initial state', () => {
      expect(orderReducer(undefined, {})).toEqual(initialState)
    })

    test('should handle ORDER_NUMBER_REQUEST', () => {
        expect(
            orderReducer({...initialState, orderRequest: false, orderFailed: true }, {
            type: types.ORDER_NUMBER_REQUEST
          })
        ).toEqual({
          ...initialState,
          orderRequest: true,
          orderFailed: false
        })
      })
  
    test('should handle ORDER_NUMBER_SUCCESS', () => {
        expect(
            orderReducer({...initialState, orderRequest: true, orderFailed: false }, { 
            type: types.ORDER_NUMBER_SUCCESS,
            order: order
        })
        ).toEqual({
            ...initialState,
            orderRequest: false,
            orderFailed: false,
            order: order
        })
    })

    test('should handle ORDER_NUMBER_FAILED', () => {
        expect(
            orderReducer({...initialState, orderRequest: true, orderFailed: false, order: order }, { 
                type: types.ORDER_NUMBER_FAILED
            })
        ).toEqual({
            ...initialState,
            orderRequest: false,
            orderFailed: true,
            order: null
        })
    })

    
})

