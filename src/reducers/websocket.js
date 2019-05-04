import { actionTypes } from '../actions';

export const WEBSOCKET_STATUS_NOT_CONNECTED = "not_connected";
export const WEBSOCKET_STATUS_CONNECTING = "connecting";
export const WEBSOCKET_STATUS_CONNECTED = "connected";
export const WEBSOCKET_STATUS_CLOSING = "closing";
export const WEBSOCKET_STATUS_CLOSED = "closed";

const initialState = {
  status: WEBSOCKET_STATUS_NOT_CONNECTED,
};

export const websocket = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WEBSOCKET_OPEN:
      return {...state, status: WEBSOCKET_STATUS_CONNECTING};
    case actionTypes.WEBSOCKET_OPENED:
      return {...state, status: WEBSOCKET_STATUS_CONNECTED};
    case actionTypes.WEBSOCKET_CLOSE:
      return {...state, status: WEBSOCKET_STATUS_CLOSING};
    case actionTypes.WEBSOCKET_CLOSED:
      return {...state, status: WEBSOCKET_STATUS_CLOSED};
    default:
      return state;
  }
};
