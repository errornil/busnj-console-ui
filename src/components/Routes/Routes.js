import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound } from '../NotFound';
import BusVehicleDataList from '../../containers/BusVehicleDataList';

export class Routes extends Component {
  render() {
    return (
      /* jshint ignore:start */
      <Switch>
        <Route exact={true} path="/">
          <BusVehicleDataList />
        </Route>

        <Route
          render={props => {
            const { pathname } = props.location;

            return <NotFound path={pathname} />;
          }}
        />
      </Switch>
      /* jshint ignore:end */
    );
  }
}
