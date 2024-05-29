import { Middleware,MiddlewareAPI } from 'redux';
import { AppDispatch, RootState, TApplicationActions } from './store';
import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_MESSAGE, WS_DISCONNECT,
    WS_USER_CONNECTION_START, WS_USER_CONNECTION_SUCCESS, WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_ERROR,WS_USER_GET_MESSAGE, WS_USER_DISCONNECT
} from './constants';

export type TWSStoreActions = {
    wsInit: typeof WS_CONNECTION_START | typeof WS_USER_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_USER_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED | typeof WS_USER_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR | typeof WS_USER_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE | typeof WS_USER_GET_MESSAGE,
    wsDisconnect: typeof WS_DISCONNECT | typeof WS_USER_DISCONNECT
};

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;

      return next => (action: TApplicationActions) => {
        const { dispatch, getState } = store;
        const { type } = action;
        const { wsInit, onOpen, onClose, onError, onMessage, wsDisconnect } = wsActions;

        if (type === wsInit) {
          let url = "";
          if (action.type === WS_CONNECTION_START)
            url = getState().wsAll.url;
          else 
            url = getState().wsUser.url;

          console.log('ws init');
          if (url) {
            socket = new WebSocket(url);
          }
        }
        if (socket) {
          socket.onopen = event => {
            console.log('ws onopen');
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = event => {
            console.log('ws init');
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = event => {
            console.log('ws onmessage');
            const { data } = event;
            const parsedData = JSON.parse(data);
            if (parsedData.success)
            {
              dispatch({ type: onMessage, payload: { ...parsedData } });  
            }
          };
  
          socket.onclose = event => {
            console.log('ws onclose');
            dispatch({ type: onClose, payload: event });

            if (socket) {
              console.log('ws socket close');

              let url = "";
              if (action.type === WS_CONNECTION_CLOSED)
                url = getState().wsAll.url;
              else 
                url = getState().wsUser.url;
              
              if (url) {
                setTimeout(() => {
                  socket = new WebSocket(url);
                }, 5000)
              }
            }
          };
          
          if (type === wsDisconnect) {
            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.close()
              socket = null;
            }
          }
        }
  
        next(action);
      };
    }) as Middleware;
  };


  