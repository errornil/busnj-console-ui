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
      zoom
    });

    var hoveredVehicleId = null;
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
      this.map.setPaintProperty(
        'vehicles',
        'circle-radius',
        ["case",
          ["boolean", ["feature-state", "hover"], false],
          9,
          7
        ]
      )
      this.map.setPaintProperty(
        'vehicles',
        'circle-color',
        ["case",
          ["boolean", ["feature-state", "hover"], false],
          "#024F9B",
          "#0368CD"
        ]
      )

      // When the user moves their mouse over the state-fill layer, we'll update the
      // feature state for the feature under the mouse.
      this.map.on("mousemove", "vehicles", (e) => {
        if (e.features.length > 0) {
          if (hoveredVehicleId) {
            this.map.setFeatureState({ source: 'vehicles', id: hoveredVehicleId }, { hover: false });
          }
          hoveredVehicleId = e.features[0].id;
          this.map.setFeatureState({ source: 'vehicles', id: hoveredVehicleId }, { hover: true });
          this.setState({ ...this.state, hover: true })
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      this.map.on("mouseleave", "vehicles", () => {
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
            "title": val.vehicleID,
            "icon": "bus-11"
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
        className={`${styles.Map} ${(this.state.hover) ? styles.MapHovered : ""}`}
        height='100%'>
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
