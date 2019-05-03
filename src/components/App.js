import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './App.scss';
import { Routes } from './Routes';

class App extends Component {
  render() {
    return (
      /* jshint ignore:start */
      <div className={styles.app}>
        <Routes />
      </div>
      /* jshint ignore:end */
    );
  }
}

App.propTypes = {
  websocketOpen: PropTypes.func.isRequired
};

export default App;
