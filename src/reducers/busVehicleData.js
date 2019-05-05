import { BUS_VEHICLE_DATA_REQUEST, BUS_VEHICLE_DATA_FAILURE, BUS_VEHICLE_DATA_SUCCESS } from "../actions/actionTypes";

const initialState = {
  latestData: {},
  messagesReceived: 0,
  isLoading: false,
};

export const busVehicleData = (state = initialState, action) => {
  switch (action.type) {
    case "REDUX_WEBSOCKET::MESSAGE":
      const data = action.payload.message.split("\n").map((s) => JSON.parse(s));
      let newDataRows = [];
      for (let i=0; i < data.length; i++) {
        newDataRows[data[i].vehicleID] = data[i];
      }

      return {
        ...state,
        latestData: {
          ...state.latestData,
          ...newDataRows
        },
        messagesReceived: (state.messagesReceived + 1)
      }
    case BUS_VEHICLE_DATA_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case BUS_VEHICLE_DATA_SUCCESS:
      let newData = state.latestData;
      
      Object.keys(action.data).forEach((key, i) => {
        if (!newData.hasOwnProperty(key)) {
          newData[key] = action.data[key]
        }
      });

      return {
        ...state,
        latestData: {
          ...state.latestData,
          ...newData          
        },
        isLoading: false
      }
    case BUS_VEHICLE_DATA_FAILURE:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
};
