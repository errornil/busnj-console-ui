import { actionTypes } from '../actions';

const STATUS_NOT_CONNECTED = "not_connected";
const STATUS_CONNECTING = "connecting";
const STATUS_CONNECTED = "connected";
const STATUS_CLOSING = "closing";
const STATUS_CLOSED = "closed";

const initialState = {
  status: STATUS_NOT_CONNECTED,
};

export const websocket = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WEBSOCKET_OPEN:
      return {...state, status: STATUS_CONNECTING};
    case actionTypes.WEBSOCKET_OPENED:
      return {...state, status: STATUS_CONNECTED};
    case actionTypes.WEBSOCKET_CLOSE:
      return {...state, status: STATUS_CLOSING};
    case actionTypes.WEBSOCKET_CLOSED:
      return {...state, status: STATUS_CLOSED};
    default:
      return state;
  }
};
