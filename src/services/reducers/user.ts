import { SET_AUTH_CHECKED, SET_USER, IS_REQUESTING, IS_SUCCESS, IS_FAILED } from '../constants';
import { TUser } from '../../utils/types';

type TUserState = Readonly<{
  user: TUser | null;
  isAuthChecked: boolean;
  isRequest: boolean;
  isFailed: boolean;
}>;

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isRequest: false,
  isFailed: false
};

type TUserAction =
  | { type: typeof SET_AUTH_CHECKED; isAuthChecked: boolean; }
  | { type: typeof SET_USER; user: TUser | null; }
  | { type: typeof IS_REQUESTING; }
  | { type: typeof IS_SUCCESS; }
  | { type: typeof IS_FAILED; }
  
export const userReducer = (state = initialState, action: TUserAction) => {
  switch(action.type) {
    
    case SET_AUTH_CHECKED: {
      //console.log('SET_AUTH_CHECKED')
      return {
        ...state,
        isAuthChecked: action.isAuthChecked,
        isRequest: false,
        isFailed: false
      }
    }
    case SET_USER: {
      //console.log('SET_USER')
      return {
        ...state,
        user: action.user,
        isRequest: false,
        isFailed: false
      }
    }
    case IS_REQUESTING: {
      //console.log('IS_REQUESTING')
      return {
        ...state,
        isRequest: true,
        isFailed: false
      }
    }
    case IS_SUCCESS: {
      //console.log('IS_SUCCESS')
      return {
        ...state,
        isRequest: false,
        isFailed: false
      }
    }
    case IS_FAILED: {
      //console.log('IS_FAILED')
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