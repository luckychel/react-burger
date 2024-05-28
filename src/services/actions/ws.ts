import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE, 
    WS_DISCONNECT
  } from '../constants';
  
  import { TOrder } from '../../utils/types';
  
  export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START,
    readonly payload: string
  }
  
  export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS
  }
  
  export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
  }
  
  export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR
  }
  
  export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE
    readonly payload: TOrder[]
  }
  
  export interface IWsDisconnect {
    readonly type: typeof WS_DISCONNECT
  }

  export type TWsActions = 
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionClosed
  | IWsConnectionError
  | IWsGetMessage
  | IWsDisconnect;

  export const wsConnectionStart = (url: string): IWsConnectionStart => ({
    type: WS_CONNECTION_START,
    payload: url
  })
  
  export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
    type: WS_CONNECTION_SUCCESS
  })
  
  export const wsConnectionClosed = (): IWsConnectionClosed => ({
    type: WS_CONNECTION_CLOSED
  })
  
  export const wsConnectionError = (): IWsConnectionError => ({
    type: WS_CONNECTION_ERROR
  })
  
  export const wsGetMessage = (orders: TOrder[]): IWsGetMessage => ({
    type: WS_GET_MESSAGE,
    payload: orders
  })

  export const wsConnectionDisconnect = (): IWsDisconnect => ({
    type: WS_DISCONNECT
  })
  
