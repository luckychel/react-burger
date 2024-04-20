import { SET_AUTH_CHECKED, SET_USER, IS_REQUESTING, IS_SUCCESS, IS_FAILED } from '../actions';
  
  const initialState = {
    user: null,
    isAuthChecked: false,
    isRequest: false,
    isFailed: false,
    errorText: ''
  };
 
  export const userReducer = (state = initialState, action) => {
    switch(action.type) {
      
      case SET_AUTH_CHECKED: {
        console.log('SET_AUTH_CHECKED')
        return {
          ...state,
          isAuthChecked: action.isAuthChecked,
          isRequest: false,
          isFailed: false
        }
      }
      case SET_USER: {
        console.log('SET_USER')
        return {
          ...state,
          user: action.user,
          isRequest: false,
          isFailed: false
        }
      }
      case IS_REQUESTING: {
        console.log('IS_REQUESTING')
        return {
          ...state,
          isRequest: true,
          isFailed: false
        }
      }
      case IS_SUCCESS: {
        console.log('IS_SUCCESS')
        return {
          ...state,
          isRequest: false,
          isFailed: false
        }
      }
      case IS_FAILED: {
        console.log('IS_FAILED')
        return {
          ...state,
          isRequest: false,
          isFailed: true
        }
      }
      
      default: {
        return state;
      }
    }
  };