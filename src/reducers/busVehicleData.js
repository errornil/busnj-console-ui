import { BUS_VEHICLE_DATA_REQUEST, BUS_VEHICLE_DATA_FAILURE, BUS_VEHICLE_DATA_SUCCESS, BUS_VEHICLE_DATA_SET_QUERY, BUS_VEHICLE_SELECT, BUS_VEHICLE_UNSELECT, REDUX_WEBSOCKET_MESSAGE } from "../actions/actionTypes";

const initialState = {
  latestData: {},
  filteredData: [],
  messagesReceived: 0,
  isLoading: false,
  query: '',
  selectedVehicle: '',
};

export const busVehicleData = (state = initialState, action) => {
  switch (action.type) {
    case REDUX_WEBSOCKET_MESSAGE:
      var data = action.payload.message.split("\n").map((s) => JSON.parse(s));
      var newDataRows = [];
      for (let i = 0; i < data.length; i++) {
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
      var newData = state.latestData;

      Object.keys(action.data).forEach((key) => {
        if (!newData.hasOwnProperty(key)) {
          newData[action.data[key].vehicleID] = action.data[key]
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

    case BUS_VEHICLE_DATA_SET_QUERY:
      var strictComparison = action.query.charAt(0) === "=";
      return {
        ...state,
        query: action.query,
        filteredData: Object.values(state.latestData).filter((item) => {
          if (strictComparison) {
            return (
              item.vehicleID == action.query.substring(1)
              || item.route == action.query.substring(1)
            )
          }

          return (
            item.vehicleID.startsWith(action.query)
            || item.route.startsWith(action.query)
            || item.destination.toLowerCase().indexOf(action.query.toLowerCase()) !== -1
          )
        })
      }

    case BUS_VEHICLE_SELECT:
      return {
        ...state,
        selectedVehicle: action.vehicleID,
      }
    
    case BUS_VEHICLE_UNSELECT:
      return {
        ...state,
        selectedVehicle: '',
      }

    default:
      return state;
  }
};
