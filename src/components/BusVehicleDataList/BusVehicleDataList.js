import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './BusVehicleDataList.scss';

class BusVehicleDataList extends Component {
  componentDidMount() {
    this.props.websocketOpen();
  }

  getEmojiForWebsocketStatus(status) {
    switch(status) {
      case "not_connected":
        return "⏹"
      case "connecting":
        return "🔄⃣"
      case "connected":
        return "🆗"
      case "closing":
        return "🔄⃣"
      case "closed":
        return "⏹"
      default:
        return "❓"
    }
  }

  render() {
    return (
      /* jshint ignore:start */
      <div className={styles.BusVehicleDataWrapper}>
        <div className={styles.BusVehicleDataSidebar}>
          <div className={styles.BusVehicleDataPanel}>
            {/* <button onClick={this.props.websocketOpen} disabled="">Open</button> */}
            <button onClick={this.props.websocketClose} disabled="">Close</button>
            <div className={styles.Stats}>
              {this.getEmojiForWebsocketStatus(this.props.websocketStatus)}&nbsp;
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
                      <td>{val.vehicleID}</td>
                      <td>{val.route}</td>
                      <td>{val.destination}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.BusVehicleDataMap}>
          Map here
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
