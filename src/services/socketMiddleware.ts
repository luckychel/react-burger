import { Middleware,MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from './store';
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
  
      return next => (action: any) => {
        const { dispatch, getState } = store;
        const { type, payload } = action;
        const { wsInit, onOpen, onClose, onError, onMessage, wsDisconnect } = wsActions;
       
        //const { user } = getState().user;
        // let accessToken = localStorage.getItem("accessToken")?.replace("Bearer ", "") || '';

    //   if (action.WS_CONNECTION_START) {
    //     if(withToken && accessToken) {
    //       socket = new WebSocket(`${wsUrl}${`?token=${accessToken}`}`);
    //     } 
    //     else {
    //       socket = new WebSocket(`${wsUrl}`);
    //     }
    //   }
//`${wsUrl}?token=${user.token}`

        if (type === wsInit) {
          debugger
          socket = new WebSocket(payload);
        }
        if (socket) {

          socket.onopen = event => {
            debugger
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = event => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch({ type: onMessage, payload: { ...parsedData } });
          };
  
          socket.onclose = event => {
            dispatch({ type: onClose, payload: event });
          };
          
          if (type === wsDisconnect) {
            debugger
            socket.close();
          }
        }
  
        next(action);
      };
    }) as Middleware;
  };


  