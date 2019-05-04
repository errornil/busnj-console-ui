import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './BusVehicleDataList.scss';
import MapView from '../../containers/MapView';
import { WEBSOCKET_STATUS_NOT_CONNECTED, WEBSOCKET_STATUS_CONNECTED, WEBSOCKET_STATUS_CONNECTING, WEBSOCKET_STATUS_CLOSING, WEBSOCKET_STATUS_CLOSED } from '../../reducers/websocket';

class BusVehicleDataList extends Component {
  componentDidMount() {
    this.props.websocketOpen();
  }

  getEmojiForWebsocketStatus(status) {
    switch(status) {
      case WEBSOCKET_STATUS_NOT_CONNECTED:
        return "⏹"
      case WEBSOCKET_STATUS_CONNECTING:
        return "🔄"
      case WEBSOCKET_STATUS_CONNECTED:
        return "🆗"
      case WEBSOCKET_STATUS_CLOSING:
        return "🔄"
      case WEBSOCKET_STATUS_CLOSED:
        return "⏹"
      default:
        return "❓"
    }
  }

  isStatus(array) {
    return array.indexOf(this.props.websocketStatus) !== -1;
  }

  render() {
    return (
      /* jshint ignore:start */
      <div className={styles.BusVehicleDataWrapper}>
        <div className={styles.BusVehicleDataSidebar}>
          <div className={styles.BusVehicleDataPanel}>
            <div className={styles.Stats}>
              {this.getEmojiForWebsocketStatus(this.props.websocketStatus)} {this.props.websocketStatus}&nbsp;
              🚌 {Object.keys(this.props.busVehicleData).length}&nbsp;
              📦 {this.props.messagesReceived}
            </div>
          </div>
          <div className={styles.BusVehicleDataTable}>
            <table className={styles.VehicleTable}>
              <thead className={styles.VehicleTableHead}>
                <tr>
                  <th>Vehicle&nbsp;ID</th>
                  <th>Route</th>
                  <th>Destination</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.props.busVehicleData).map((key, i) => {
                  const val = this.props.busVehicleData[key];
                  return (
                    <tr key={key}>
                      <td className={styles.CellNumber}>{val.vehicleID}</td>
                      <td className={styles.CellNumber}>{val.route}</td>
                      <td>{val.destination}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.BusVehicleDataMap}>
          <MapView />
        </div>
      </div>
      /* jshint ignore:end */
    );
  }
}

BusVehicleDataList.propTypes = {
  busVehicleData: PropTypes.object.isRequired,
  messagesReceived: PropTypes.number.isRequired,
  websocketStatus: PropTypes.string.isRequired,
  websocketOpen: PropTypes.func.isRequired,
  websocketClose: PropTypes.func.isRequired,
};

export default BusVehicleDataList;
