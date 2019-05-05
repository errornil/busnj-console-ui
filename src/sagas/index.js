import { all } from 'redux-saga/effects';
import {
  watchWebsocketOpen,
  watchWebsocketOpened,
  watchWebsocketClose,
  watchWebsocketClosed
} from './websocket';
import { watchBusVehicleDataRequest } from './busVehicleData';

export const rootSaga = function* () {
  yield all([
    watchWebsocketOpen,
    watchWebsocketOpened,
    watchWebsocketClose,
    watchWebsocketClosed,
    watchBusVehicleDataRequest,
  ]);
};
