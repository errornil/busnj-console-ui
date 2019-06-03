import { connect } from 'react-redux';
import { actionTypes } from '../actions';
import MapView from '../components/MapView/MapView';

const mapStateToProps = state => ({
  busVehicleData: state.busVehicleData.latestData,
  filteredData: state.busVehicleData.filteredData,
  query: state.busVehicleData.query,
  selectedVehicle: state.busVehicleData.selectedVehicle,
});

const mapDispatchToProps = (dispatch) => ({
  selectVehicle: (vehicleID) => dispatch({type: actionTypes.BUS_VEHICLE_SELECT, vehicleID}),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
