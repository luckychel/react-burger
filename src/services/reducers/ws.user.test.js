import { initialState, wsUserReducer } from './wsUser'
import * as types from '../constants';

describe('ws user reducer', () => {
  
    test('should return the initial state', () => {
        expect(wsUserReducer(undefined, {})).toEqual(initialState)
    })

    test('should handle WS_USER_CONNECTION_START', () => {
        expect(
            wsUserReducer({...initialState, isRequest: false }, {
            type: types.WS_USER_CONNECTION_START
            })
        ).toEqual({
            ...initialState,
            isRequest: true
        })
    })
  
    test('should handle WS_USER_CONNECTION_SUCCESS', () => {
        expect(
            wsUserReducer({...initialState, isRequest: true, connected: false }, { 
            type: types.WS_USER_CONNECTION_SUCCESS
        })
        ).toEqual({
            ...initialState,
            isRequest: false,
            connected: true
        })
    })

    test('should handle WS_USER_CONNECTION_CLOSED', () => {
        expect(
            wsUserReducer({...initialState, isRequest: true, connected: true }, { 
            type: types.WS_USER_CONNECTION_CLOSED
        })
        ).toEqual({
            ...initialState,
            isRequest: false,
            connected: false
        })
    })

    test('should handle WS_USER_CONNECTION_ERROR', () => {
        expect(
            wsUserReducer({...initialState, isRequest: true, connected: true }, { 
                type: types.WS_USER_CONNECTION_ERROR
            })
        ).toEqual({
            ...initialState,
            isRequest: false,
            connected: false
        })
    })

    test('should handle WS_USER_GET_MESSAGE', () => {
        const mockOrders = {
            orders: [
              {id: '1'}, 
              {id: '2'}
            ], 
            total: 678
          };
        expect(
            wsUserReducer({...initialState, isRequest: true }, { 
                type: types.WS_USER_GET_MESSAGE,
                payload: mockOrders.orders
            })
        ).toEqual({
            ...initialState,
            isRequest: false,
            data: mockOrders.orders
        })
    })
})

