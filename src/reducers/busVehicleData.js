const initialState = {
  latestData: {},
  messagesReceived: 0,
};

export const busVehicleData = (state = initialState, action) => {
  switch (action.type) {
    case "REDUX_WEBSOCKET::MESSAGE":
      const message = JSON.parse(action.payload.message)
      return {
        ...state,
        latestData: {
          ...state.latestData,
          [message.vehicleID]: message,
        },
        messagesReceived: (state.messagesReceived + 1)
      }
    default:
      return state;
  }
};
