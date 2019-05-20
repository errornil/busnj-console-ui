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
      lng: -74,
      lat: 41,
      zoom: 8,
      hover: false
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom: zoom,
      maxBounds: [[-77, 38], [-72, 42]]
    });

    let hoveredVehicleId = null;

    this.map.on('load', () => {
      this.map.on('move', () => {
        const { lng, lat } = this.map.getCenter();

        this.setState({
          ...this.state,
          lng: lng.toFixed(4),
          lat: lat.toFixed(4),
          zoom: this.map.getZoom().toFixed(2)
        });
      });

      this.map.on('render', () => { this.map.resize() });

      this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      this.map.addSource('vehicles', { type: 'geojson', data: this.getData() });

      this.map.addLayer(
        { id: 'vehicles', type: 'circle', source: 'vehicles' },
        'country-label-lg' // ID matches `mapbox/streets-v9`
      );
      this.map.setPaintProperty(
        'vehicles',
        'circle-radius',
        5
        // ["case",
        //   ["boolean", ["feature-state", "hover"], false],
        //   9,
        //   7
        // ]
      );
      this.map.setPaintProperty(
        'vehicles',
        'circle-color',
        "#0368CD"
        // ["case",
        //   ["boolean", ["feature-state", "hover"], false],
        //   "#024F9B",
        //   "#0368CD"
        // ]
      );
      this.map.addLayer(
        { 
          id: 'vehicles_labels',
          type: 'symbol',
          source: 'vehicles',
          layout: {
            "text-field": "{route}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-size": 10,
            "text-variable-anchor": ["left", "right", "bottom", "top"],
            "text-radial-offset": 0.6,
          }
        },
        'country-label-lg' // ID matches `mapbox/streets-v9`
      );

      this.map.on("mousemove", "vehicles", (e) => {
        if (e.features.length > 0) {
          // handle "hover" state
          if (hoveredVehicleId) {
            this.map.setFeatureState({ source: 'vehicles', id: hoveredVehicleId }, { hover: false });
          }
          hoveredVehicleId = e.features[0].id;
          this.map.setFeatureState({ source: 'vehicles', id: hoveredVehicleId }, { hover: true });
          this.setState({ ...this.state, hover: true })
        }
      });

      this.map.on("mouseleave", "vehicles", () => {
        // handle "hover" state
        if (hoveredVehicleId) {
          this.map.setFeatureState({ source: 'vehicles', id: hoveredVehicleId }, { hover: false });
          this.setState({ ...this.state, hover: false })
        }
        hoveredVehicleId = null;
      });
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.busVehicleData !== prevProps.busVehicleData
      || this.props.filteredData !== prevProps.filteredData
    ) {
      if (this.map !== undefined && this.map.getSource('vehicles') !== undefined) {
        this.map.getSource('vehicles').setData(this.getData());
      }
    }
  }

  getData() {
    let query = this.props.query || "";
    const source = (query !== "")
      ? this.props.filteredData
      : Object.values(this.props.busVehicleData);

    return {
      "type": "FeatureCollection",
      "features": source.map((val) => {
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
            "vehicleID": val.vehicleID,
            "route": val.route,
            "destination": val.destination,
          },
          "id": val.vehicleID
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
        style={{height: "100vh"}}
        >
      </div>
      /* jshint ignore:end */
    );
  }
}

MapView.propTypes = {
  busVehicleData: PropTypes.object.isRequired,
  filteredData: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
};

export default MapView;
