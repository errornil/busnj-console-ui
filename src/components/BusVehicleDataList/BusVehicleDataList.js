import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './BusVehicleDataList.scss';
import MapView from '../../containers/MapView';
import { WEBSOCKET_STATUS_NOT_CONNECTED, WEBSOCKET_STATUS_CONNECTED, WEBSOCKET_STATUS_CONNECTING, WEBSOCKET_STATUS_CLOSING, WEBSOCKET_STATUS_CLOSED } from '../../reducers/websocket';

class BusVehicleDataList extends Component {
  constructor(props, context) {
    super(props, context);
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  componentDidMount() {
    this.props.websocketOpen();
    this.props.getBusVehicleData();
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

  onQueryChange(event) {
    this.props.setQuery(event.target.value);
  }

  render() {
    let query = this.props.query || "";
    const source = (query !== "")
      ? this.props.filteredData
      : Object.values(this.props.busVehicleData);

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
            <input
              value={this.props.query}
              onChange={this.onQueryChange}
              type="text"
              placeholder="Search"
              className={styles.BusVehicleDataSearchInput}
              />
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
                {source.map((val) => {
                  return (
                    <tr key={val.vehicleID}>
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
  filteredData: PropTypes.array.isRequired,
  messagesReceived: PropTypes.number.isRequired,
  websocketStatus: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,

  websocketOpen: PropTypes.func.isRequired,
  websocketClose: PropTypes.func.isRequired,
  getBusVehicleData: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default BusVehicleDataList;
