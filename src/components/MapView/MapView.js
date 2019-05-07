import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl'
import styles from './MapView.scss'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2h1aGxvbWluIiwiYSI6ImNpaXBiNnBsdTAxbzF0cmtucmEwM2Y0cWoifQ.wBWKRFpAiP9GOaqadZryAQ';

class MapView extends Component {
  map;

  constructor(props) {
    super(props);
    this.state = {
      lng: -74.152,
      lat: 40.762,
      zoom: 8
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    this.map.on('load', () => {
      this.map.on('move', () => {
        const { lng, lat } = this.map.getCenter();

        this.setState({
          lng: lng.toFixed(4),
          lat: lat.toFixed(4),
          zoom: this.map.getZoom().toFixed(2)
        });
      });

      this.map.on('render', () => {
        this.map.resize();
      });

      this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      this.map.addSource('vehicles', {
        type: 'geojson',
        data: this.getData()
      });

      this.map.addLayer({
        id: 'vehicles',
        type: 'circle',
        source: 'vehicles',
      }, 'country-label-lg'); // ID metches `mapbox/streets-v9`
      this.map.setPaintProperty('vehicles', 'circle-radius', 4)
      this.map.setPaintProperty('vehicles', 'circle-color', "#024F9B")
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidUpdate(prevProps) {
    if (this.props.busVehicleData !== prevProps.busVehicleData) {
      if (this.map !== undefined && this.map.getSource('vehicles') !== undefined) {
        this.map.getSource('vehicles').setData(this.getData());
      }
    }
  }

  getData() {
    return {
      "type": "FeatureCollection",
      "features": Object.keys(this.props.busVehicleData).map((key) => {
        const val = this.props.busVehicleData[key]
        return {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              val.longitude,
              val.latitude,
            ]
          },
          "properties": {
            "title": val.vehicleID,
            "icon": "bus-11"
          }
        }
      })
    }
  }

  render() {
    return (
      /* jshint ignore:start */
      <div
        ref={el => this.mapContainer = el}
        className={styles.Map}
        height='100%'>
      </div>
      /* jshint ignore:end */
    );
  }
}

MapView.propTypes = {
  busVehicleData: PropTypes.object.isRequired,
};

export default MapView;
