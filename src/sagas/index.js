import { all } from 'redux-saga/effects';
import {
  watchWebsocketOpen,
  watchWebsocketOpened,
  watchWebsocketMessage,
  watchWebsocketClose,
  watchWebsocketClosed
} from './websocket';

export const rootSaga = function* () {
  yield all([
    watchWebsocketOpen,
    watchWebsocketOpened,
    watchWebsocketMessage,
    watchWebsocketClose,
    watchWebsocketClosed,
  ]);
};
