import { combineReducers } from 'redux';
import { websocket } from './websocket';
import { busVehicleData } from './busVehicleData';

export const combinedReducer = combineReducers({
  websocket,
  busVehicleData,
});
