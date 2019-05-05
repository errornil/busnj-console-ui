import { takeLatest, put, call } from 'redux-saga/effects';
import { actionTypes } from '../actions';
import { api } from '../components/services';

export const busVehicleDataRequest = function* () {
  try {
    const response = yield call(() => {
      return api.fetchBusVehicleData();
    });

    yield put({
      type: actionTypes.BUS_VEHICLE_DATA_SUCCESS,
      data: response.data
    });
  } catch (error) {
    yield put({
      type: actionTypes.BUS_VEHICLE_DATA_FAILURE,
      error: error
    });
  }
};

export const watchBusVehicleDataRequest = takeLatest(actionTypes.BUS_VEHICLE_DATA_REQUEST, busVehicleDataRequest);
