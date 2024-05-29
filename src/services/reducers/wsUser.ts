import { WS_USER_CONNECTION_START, WS_USER_CONNECTION_SUCCESS, WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_ERROR, WS_USER_GET_MESSAGE } from '../constants';

import { TWsUserState } from '../../utils/types';
import { TWsUserActions } from '../actions/wsUser';
  
const initialState: TWsUserState = {
    connected: false,
    data: null,
    url: `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem("accessToken")?.replace("Bearer ", "") || ''}`
};
  
export const wsUserReducer = (state = initialState, action: TWsUserActions): TWsUserState => {
    switch (action.type) {
        case WS_USER_CONNECTION_START: {
            return {
                ...state
            }
        }
        case WS_USER_CONNECTION_SUCCESS: {
            return {
                ...state,
                connected: true
            }
        }
        case WS_USER_CONNECTION_CLOSED: {
            return {
                ...state,
                connected: false
            }
        }
        case WS_USER_CONNECTION_ERROR: {
            return {
                ...state,
                connected: false
            }
        }
        case WS_USER_GET_MESSAGE: {
            return {
                ...state,
                data: action.payload
            }
        }
        default: {
            return state;
        }
    }
}