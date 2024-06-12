import { initialState, userReducer } from './user'
import * as types from '../constants';
import user from '../../unused/user'

describe('user reducer', () => {
  
    test('should return the initial state', () => {
      expect(userReducer(undefined, {})).toEqual(initialState)
    })

    test('should handle SET_AUTH_CHECKED', () => {
        expect(
            userReducer({...initialState, isRequest: true, isFailed: true }, {
            type: types.SET_AUTH_CHECKED,
            isAuthChecked: true
          })
        ).toEqual({
          ...initialState,
          isAuthChecked: true,
          isRequest: false,
          isFailed: false
        })
      })

      test('should handle SET_USER', () => {
        expect(
            userReducer({...initialState, isRequest: true, isFailed: true }, {
            type: types.SET_USER,
            user: user.user
        })
        ).toEqual({
          ...initialState,
          user: user.user,
          isRequest: false,
          isFailed: false
        })
      })

      test('should handle IS_REQUESTING', () => {
        expect(
            userReducer({...initialState, isRequest: false, isFailed: true }, {
            type: types.IS_REQUESTING
          })
        ).toEqual({
          ...initialState,
          isRequest: true,
          isFailed: false
        })
      })
  
    test('should handle IS_SUCCESS', () => {
        expect(
            userReducer({...initialState, isRequest: true, isFailed: false }, { 
            type: types.IS_SUCCESS
        })
        ).toEqual({
            ...initialState,
            isRequest: false,
            isFailed: false
        })
    })

    test('should handle IS_FAILED', () => {
        expect(
            userReducer({...initialState, isRequest: true, isFailed: false }, { 
                type: types.IS_FAILED
            })
        ).toEqual({
            ...initialState,
            isRequest: false,
            isFailed: true
        })
    })
    
})

