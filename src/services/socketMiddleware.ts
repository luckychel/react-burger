import { Middleware,MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from './store';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from './constants';

export type TWSStoreActions = {
    wsInit: typeof  WS_CONNECTION_START,
    wsSendMessage: typeof WS_SEND_MESSAGE,
    onSuccess: typeof  WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof  WS_CONNECTION_ERROR,
    onMessage: typeof  WS_GET_MESSAGE,
};

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;
  
      return next => (action: any) => {
        const { dispatch, getState } = store;
        const { type } = action;
        const { wsInit, wsSendMessage, onSuccess, onClose, onError, onMessage } = wsActions;
        const { user } = getState().user;

          // let accessToken = localStorage.getItem("accessToken")?.replace("Bearer ", "") || '';

    //   if (action.WS_CONNECTION_START) {
    //     if(withToken && accessToken) {
    //       socket = new WebSocket(`${wsUrl}${`?token=${accessToken}`}`);
    //     } 
    //     else {
    //       socket = new WebSocket(`${wsUrl}`);
    //     }
    //   }

        if (type === wsInit && user) {
          socket = new WebSocket(`${wsUrl}?token=${user.token}`);
        }
        if (socket) {
          socket.onopen = event => {
            dispatch({ type: onSuccess, payload: event });
          };
  
          socket.onerror = event => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            //const parsedData: IMessageResponse = JSON.parse(data);
            //const { success, ...restParsedData } = parsedData;
  
            //dispatch({ type: onMessage, payload: { ...restParsedData } });
          };
  
          socket.onclose = event => {
            dispatch({ type: onClose, payload: event });
          };
  
          if (type === wsSendMessage) {
            const payload = action.payload;
            //const message = { ...(payload as IMessage), token: user?.token };
            //socket.send(JSON.stringify(message));
          }
        }
  
        next(action);
      };
    }) as Middleware;
  };


  