import { ORDER_NUMBER_REQUEST, ORDER_NUMBER_SUCCESS, ORDER_NUMBER_FAILED } from '../constants';
import { TOrderState} from '../../utils/types';

const initialState: TOrderState = {
    orderRequest: false,
    orderFailed: false,
    order: null
  };