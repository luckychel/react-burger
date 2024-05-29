import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_MESSAGE } from '../constants';

import { TWsState } from '../../utils/types';
import { TWsActions } from '../actions/ws';
  
const initialState: TWsState = {
    connected: false,
    data: null,
    url: "wss://norma.nomoreparties.space/orders/all"
};
  
export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
                ...state
            }
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                connected: true
            }
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                connected: false
            }
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                connected: false
            }
        }
        case WS_GET_MESSAGE: {
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

