import { connect } from 'react-redux';
import MapView from '../components/MapView/MapView';

const mapStateToProps = state => ({
  busVehicleData: state.busVehicleData.latestData,
});

export default connect(mapStateToProps, null)(MapView);
