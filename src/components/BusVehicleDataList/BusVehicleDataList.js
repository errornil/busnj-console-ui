import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './BusVehicleDataList.scss';
import MapView from '../../containers/MapView';
import { WEBSOCKET_STATUS_NOT_CONNECTED, WEBSOCKET_STATUS_CONNECTED, WEBSOCKET_STATUS_CONNECTING, WEBSOCKET_STATUS_CLOSING, WEBSOCKET_STATUS_CLOSED } from '../../reducers/websocket';
import BusVehicleDataRow from './BusVehicleDataRow/BusVehicleDataRow';

class BusVehicleDataList extends Component {
  constructor(props, context) {
    super(props, context);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
  }

  componentDidMount() {
    this.props.websocketOpen();
    this.props.getBusVehicleData();
  }

  getEmojiForWebsocketStatus(status) {
    switch (status) {
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

  onBackClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.unselectVehicle()
  }

  render() {
    let query = this.props.query || "";
    const source = (query !== "")
      ? this.props.filteredData
      : []; // Object.values(this.props.busVehicleData);

    return (
      /* jshint ignore:start */
      <div className={styles.BusVehicleDataWrapper}>
        <div className={styles.BusVehicleDataSidebar}>
          {this.props.selectedVehicle === ''
            ? (
              <input
                value={this.props.query}
                onChange={this.onQueryChange}
                type="text"
                placeholder="Search"
                className={styles.BusVehicleDataSearchInput}
              />
            )
            : (
              <></>
            )
          }
          {source.length > 0 && this.props.selectedVehicle === ''
            ? (
              <ul className={styles.BusVehicleDataSearchResults}>
                {source.map((val) => {
                  return (
                    <li
                      key={val.vehicleID}
                      onClick={this.onRowClick}
                    >
                      <BusVehicleDataRow
                        val={val}
                        query={query}
                        selectVehicle={this.props.selectVehicle}
                      />
                    </li>
                  )
                })}
              </ul>
            )
            : (<></>)
          }
          {this.props.selectedVehicle !== ''
            ? (
              <div className={styles.BusVehicleDataSelectedVehicle}>
                <div className={styles.BusVehicleDataNav}>
                  <a className={styles.Back} onClick={this.onBackClick} href="#back">← Back</a>
                </div>
                <div className={styles.SelectedVehicle}>
                  <BusVehicleDataRow
                    val={this.props.latestData[this.props.selectedVehicle]}
                    query={query}
                  />
                </div>
              </div>
            )
            : (<></>)
          }
        </div>
        <div className={styles.Stats}>
          {this.getEmojiForWebsocketStatus(this.props.websocketStatus)} {this.props.websocketStatus}&nbsp;
          🚌 {Object.keys(this.props.latestData).length}&nbsp;
          📦 {this.props.messagesReceived}
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
  latestData: PropTypes.object.isRequired,
  filteredData: PropTypes.array.isRequired,
  messagesReceived: PropTypes.number.isRequired,
  websocketStatus: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  selectedVehicle: PropTypes.string.isRequired,

  websocketOpen: PropTypes.func.isRequired,
  websocketClose: PropTypes.func.isRequired,
  getBusVehicleData: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  selectVehicle: PropTypes.func.isRequired,
  unselectVehicle: PropTypes.func.isRequired,
};

export default BusVehicleDataList;
