import { takeLatest, put } from 'redux-saga/effects';
import { connect, send, disconnect } from '@giantmachines/redux-websocket';
import { actionTypes } from '../actions';
import { busVehicleDataStreamPath } from '../config';

export const websocketOpen = function* () {
  yield put(connect(busVehicleDataStreamPath));
};

export const websocketOpened = function* () {
  yield put({type: actionTypes.WEBSOCKET_OPENED});
  yield put(send("hello")); // initiate stream
};

export const websocketMessage = function* (action) {
  // yield put({type: actionTypes.WEBSOCKET_MESSAGE})
};

export const websocketClose = function* () {
  yield put(disconnect());
};

export const websocketClosed = function* () {
  yield put({type: actionTypes.WEBSOCKET_CLOSED});
};

export const watchWebsocketOpen = takeLatest(actionTypes.WEBSOCKET_OPEN, websocketOpen);
export const watchWebsocketOpened = takeLatest("REDUX_WEBSOCKET::OPEN", websocketOpened);
export const watchWebsocketMessage = takeLatest("REDUX_WEBSOCKET::MESSAGE", websocketMessage);
export const watchWebsocketClose = takeLatest(actionTypes.WEBSOCKET_CLOSE, websocketClose);
export const watchWebsocketClosed = takeLatest("REDUX_WEBSOCKET::CLOSED", websocketClosed);
