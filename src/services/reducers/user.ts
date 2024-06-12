import { SET_AUTH_CHECKED, SET_USER, IS_REQUESTING, IS_SUCCESS, IS_FAILED } from '../constants';
import { TUserAction } from '../actions';
import { TUserState } from '../../utils/types';

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isRequest: false,
  isFailed: false
};
  
export const userReducer = (state = initialState, action: TUserAction): TUserState => {
  switch(action.type) {
    
    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.isAuthChecked,
        isRequest: false,
        isFailed: false
      }
    }
    case SET_USER: {
      return {
        ...state,
        user: action.user,
        isRequest: false,
        isFailed: false
      }
    }
    case IS_REQUESTING: {
      return {
        ...state,
        isRequest: true,
        isFailed: false
      }
    }
    case IS_SUCCESS: {
      return {
        ...state,
        isRequest: false,
        isFailed: false
      }
    }
    case IS_FAILED: {
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