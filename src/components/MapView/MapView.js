import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './MapView.scss';

class MapView extends Component {
  onComponentMount() {
  //   mapkit.init({
  //     authorizationCallback: function(done) {
  //         fetch("/gettoken")
  //             .then(res => res.text())
  //             .then(done);
  //     },
  // });
  }

  render() {
    return (
      /* jshint ignore:start */
      <div>
        1
      </div>
      /* jshint ignore:end */
    );
  }
}

MapView.propTypes = {
  busVehicleData: PropTypes.object.isRequired,
};

export default MapView;
