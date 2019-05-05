import { connect } from 'react-redux';
import { actionTypes } from '../actions';
import BusVehicleDataList from '../components/BusVehicleDataList/BusVehicleDataList';

const mapStateToProps = state => ({
  busVehicleData: state.busVehicleData.latestData,
  messagesReceived: state.busVehicleData.messagesReceived,
  websocketStatus: state.websocket.status,
});

const mapDispatchToProps = (dispatch) => ({
  websocketOpen: () => dispatch({type: actionTypes.WEBSOCKET_OPEN}),
  websocketClose: () => dispatch({type: actionTypes.WEBSOCKET_CLOSE}),
  getBusVehicleData: () => dispatch({type: actionTypes.BUS_VEHICLE_DATA_REQUEST}),
});

export default connect(mapStateToProps, mapDispatchToProps)(BusVehicleDataList);
