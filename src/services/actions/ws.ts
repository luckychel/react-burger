import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE, 
  WS_DISCONNECT
} from '../constants';

import { TOrdersResponse } from '../../utils/types';

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START
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
  readonly payload: TOrdersResponse
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

export const wsConnectionStart = (): IWsConnectionStart => ({
  type: WS_CONNECTION_START
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

export const wsGetMessage = (orders: TOrdersResponse): IWsGetMessage => ({
  type: WS_GET_MESSAGE,
  payload: orders
})

export const wsConnectionDisconnect = (): IWsDisconnect => ({
  type: WS_DISCONNECT
})

