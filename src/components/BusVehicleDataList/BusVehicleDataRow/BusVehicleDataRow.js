import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './../BusVehicleDataList.scss';

class BusVehicleDataRow extends Component {
  constructor(props, context) {
    super(props, context);
    this.onRowClick = this.onRowClick.bind(this);
  }

  onRowClick(/* event */) {
    if (this.props.selectVehicle === undefined) {
      return;
    }

    this.props.selectVehicle(this.props.val.vehicleID);
  }

  render() {
    return (
      /* jshint ignore:start */
      <div className={styles.Row} onClick={this.onRowClick}>
        <div className={styles.Destination}>
          {this.props.val.destination}
        </div>
        <div className={styles.Details}>
          <ul>
            <li>VehicleID: {this.props.val.vehicleID} </li>
            <li>Route: {this.props.val.route} </li>
            <li>RunID: {this.props.val.runID} </li>
            <li>TripBlock: {this.props.val.tripBlock} </li>
            <li>PatternID: {this.props.val.patternID} </li>
            <li>GPS Timestamp: {this.props.val.GPStimestmp} </li>
          </ul>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }
}

BusVehicleDataRow.propTypes = {
  val: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  selectVehicle: PropTypes.func,
};

export default BusVehicleDataRow;
