import { connect } from 'react-redux';
import { actionTypes } from '../actions';
import BusVehicleDataList from '../components/BusVehicleDataList/BusVehicleDataList';

const mapStateToProps = state => ({
  busVehicleData: state.busVehicleData.latestData,
  filteredData: state.busVehicleData.filteredData,
  messagesReceived: state.busVehicleData.messagesReceived,
  websocketStatus: state.websocket.status,
  query: state.busVehicleData.query,
});

const mapDispatchToProps = (dispatch) => ({
  websocketOpen: () => dispatch({type: actionTypes.WEBSOCKET_OPEN}),
  websocketClose: () => dispatch({type: actionTypes.WEBSOCKET_CLOSE}),
  getBusVehicleData: () => dispatch({type: actionTypes.BUS_VEHICLE_DATA_REQUEST}),
  setQuery: (query) => dispatch({type: actionTypes.BUS_VEHICLE_DATA_SET_QUERY, query}),
});

export default connect(mapStateToProps, mapDispatchToProps)(BusVehicleDataList);
