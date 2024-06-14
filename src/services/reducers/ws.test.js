import { initialState, wsReducer } from './ws'
import * as types from '../constants';

describe('ws reducer', () => {
  
    test('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState)
    })

    test('should handle WS_CONNECTION_START', () => {
        expect(
            wsReducer({...initialState, isRequest: false }, {
            type: types.WS_CONNECTION_START
            })
        ).toEqual({
            ...initialState,
            isRequest: true
        })
    })
  
    test('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            wsReducer({...initialState, isRequest: true, connected: false }, { 
            type: types.WS_CONNECTION_SUCCESS
        })
        ).toEqual({
            ...initialState,
            isRequest: false,
            connected: true
        })
    })

    test('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            wsReducer({...initialState, isRequest: true, connected: true }, { 
            type: types.WS_CONNECTION_CLOSED
        })
        ).toEqual({
            ...initialState,
            isRequest: false,
            connected: false
        })
    })

    test('should handle WS_CONNECTION_ERROR', () => {
        expect(
            wsReducer({...initialState, isRequest: true, connected: true }, { 
                type: types.WS_CONNECTION_ERROR
            })
        ).toEqual({
            ...initialState,
            isRequest: false,
            connected: false
        })
    })

    test('should handle WS_GET_MESSAGE', () => {
        const mockOrders = {
            orders: [
              {id: '1'}, 
              {id: '2'}
            ], 
            total: 678
          };
        expect(
            wsReducer({...initialState, isRequest: true }, { 
                type: types.WS_GET_MESSAGE,
                payload: mockOrders.orders
            })
        ).toEqual({
            ...initialState,
            isRequest: false,
            data: mockOrders.orders
        })
    })
})

