import { SET_AUTH_CHECKED, SET_USER, USER_REQUEST, USER_REQUEST_SUCCESS, USER_REQUEST_FAILED } from '../actions';
  
  const initialState = {
    user: null,
    isAuthChecked: false
  };
 
  export const userReducer = (state = initialState, action) => {
    switch(action.type) {
      
      case SET_AUTH_CHECKED: {
        console.log('SET_AUTH_CHECKED')
        return {
          ...state,
          isAuthChecked: action.isAuthChecked
        }
      }
      case SET_USER: {
        console.log('SET_USER')
        return {
          ...state,
          user: action.user
        }
      }
      case USER_REQUEST: {
        console.log('USER_REQUEST')
        return {
          ...state,
        }
      }
      case USER_REQUEST_SUCCESS: {
        console.log('USER_REQUEST_SUCCESS')
        return {
          ...state,
          user: action.user
        }
      }
      case USER_REQUEST_FAILED: {
        console.log('USER_REQUEST_FAILED')
        return {
          ...state,
          user: null
        }
      }
      
      default: {
        return state;
      }
    }
  };