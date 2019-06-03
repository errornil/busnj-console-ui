import { connect } from 'react-redux';
import { actionTypes } from '../actions';
import BusVehicleDataList from '../components/BusVehicleDataList/BusVehicleDataList';

const mapStateToProps = state => ({
  latestData: state.busVehicleData.latestData,
  filteredData: state.busVehicleData.filteredData,
  messagesReceived: state.busVehicleData.messagesReceived,
  websocketStatus: state.websocket.status,
  query: state.busVehicleData.query,
  selectedVehicle: state.busVehicleData.selectedVehicle,
});

const mapDispatchToProps = (dispatch) => ({
  websocketOpen: () => dispatch({type: actionTypes.WEBSOCKET_OPEN}),
  websocketClose: () => dispatch({type: actionTypes.WEBSOCKET_CLOSE}),
  getBusVehicleData: () => dispatch({type: actionTypes.BUS_VEHICLE_DATA_REQUEST}),
  setQuery: (query) => dispatch({type: actionTypes.BUS_VEHICLE_DATA_SET_QUERY, query}),
  selectVehicle: (vehicleID) => dispatch({type: actionTypes.BUS_VEHICLE_SELECT, vehicleID}),
  unselectVehicle: () => dispatch({type: actionTypes.BUS_VEHICLE_UNSELECT}),
});

export default connect(mapStateToProps, mapDispatchToProps)(BusVehicleDataList);
