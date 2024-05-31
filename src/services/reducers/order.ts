import { ORDER_NUMBER_REQUEST, ORDER_NUMBER_SUCCESS, ORDER_NUMBER_FAILED } from '../constants';
import { TGetOrderState} from '../../utils/types';
import { TGetOrderAction } from '../actions';

const initialState: TGetOrderState = {
    orderRequest: false,
    orderFailed: false,
    order: null
  };

  export const orderReducer = (state = initialState, action: TGetOrderAction): TGetOrderState => {
    switch(action.type) {
      case ORDER_NUMBER_REQUEST: {
        return {
          ...state,
          orderRequest: true,
          orderFailed: false
        }
      }
      case ORDER_NUMBER_SUCCESS: {
        return {
          ...state,
          orderRequest: false,
          orderFailed: false,
          order: action.order
        }
      }
      case ORDER_NUMBER_FAILED: {
        return {
          ...state,
          orderRequest: false,
          orderFailed: true,
          order: null
        }
      }
      
      default: {
        return state;
      }
    }
  };