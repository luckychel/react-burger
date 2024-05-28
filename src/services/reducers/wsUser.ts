import { WS_USER_CONNECTION_START, WS_USER_CONNECTION_SUCCESS, WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_ERROR, WS_USER_GET_MESSAGE } from '../constants';

import { TWsUserState } from '../../utils/types';
import { TWsUserActions } from '../actions/wsUser';
  
const initialState: TWsUserState = {
    connected: false,
    orders: []
};
  
export const wsUserReducer = (state = initialState, action: TWsUserActions) => {
    switch (action.type) {
        case WS_USER_CONNECTION_START: {
        return {
            ...state
        }
        }
        case WS_USER_CONNECTION_SUCCESS: {
        return {
            ...state,
            wsConnected: true
        }
        }
        case WS_USER_CONNECTION_CLOSED: {
        return {
            ...state,
            wsConnected: false
        }
        }
        case WS_USER_CONNECTION_ERROR: {
        return {
            ...state,
            wsConnected: false
        }
        }
        case WS_USER_GET_MESSAGE: {
        return {
            ...state,
            orders: action.payload
        }
        }
        default: {
        return state;
        }
    }
}