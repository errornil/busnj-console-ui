import { connect } from 'react-redux';
import MapView from '../components/MapView/MapView';

const mapStateToProps = state => ({
  busVehicleData: state.busVehicleData.latestData,
  filteredData: state.busVehicleData.filteredData,
  query: state.busVehicleData.query,
  selectedVehicle: state.busVehicleData.selectedVehicle,
});

export default connect(mapStateToProps, null)(MapView);
