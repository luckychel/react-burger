import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_MESSAGE } from '../constants';

import { TWsState } from '../../utils/types';
import { TWsActions } from '../actions/ws';
import { protocolWss, baseUrl } from '../constants';

export const initialState: TWsState = {
    connected: false,
    data: null,
    isRequest: false,
    url: `${protocolWss}${baseUrl}orders/all`
};
  
export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
                ...state,
                isRequest: true
            }
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                connected: true,
                isRequest: false
            }
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                connected: false,
                isRequest: false
            }
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                connected: false,
                isRequest: false
            }
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                data: action.payload,
                isRequest: false
            }
        }
        default: {
            return state;
        }
    }
}

