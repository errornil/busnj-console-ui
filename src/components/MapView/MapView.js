import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl'
import styles from './MapView.scss'
import { mapboxAccessToken } from '../../config'

mapboxgl.accessToken = mapboxAccessToken;

class MapView extends Component {
  map;

  constructor(props) {
    super(props);
    this.state = {
      lng: -74,
      lat: 41,
      zoom: 8,
      hoveredVehicleID: null,
    };
  }

  selectVehicle(vehicleID) {
    this.props.selectVehicle(vehicleID);
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom: zoom,
      maxBounds: [[-77, 38], [-72, 42]],
      logoPosition: 'bottom-right',
    });

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
        ["case",
          ["boolean", ["feature-state", "hover"], false],
          7,
          5
        ]
      );
      this.map.setPaintProperty(
        'vehicles',
        'circle-color',
        ["case",
          ["boolean", ["feature-state", "hover"], false],
          "#024F9B",
          "#508BF7"
        ]
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

      this.map.on('mouseenter', 'vehicles', (event) => {
        this.map.getCanvas().style.cursor = 'pointer';

        // handle "hover" state
        if (this.state.hoveredVehicleID !== null) {
          this.map.setFeatureState(
            { source: 'vehicles', id: this.state.hoveredVehicleID },
            { hover: false }
          );
        }

        this.setState(
          {
            ...this.state,
            hoveredVehicleID: event.features[0].id
          }
        )

        this.map.setFeatureState(
          { source: 'vehicles', id: this.state.hoveredVehicleID },
          { hover: true }
        );
      });

      this.map.on("mouseleave", "vehicles", () => {
        this.map.getCanvas().style.cursor = '';

        if (this.state.hoveredVehicleID !== null) {
          this.map.setFeatureState(
            { source: 'vehicles', id: this.state.hoveredVehicleID },
            { hover: false }
          );
          this.setState(
            {
              ...this.state,
              hoveredVehicleID: null
            }
          )
        }
      });

      this.map.on('click', 'vehicles', (event) => {
        this.props.selectVehicle(event.features[0].properties.vehicleID);
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
      || this.props.selectedVehicle !== prevProps.selectedVehicle
    ) {
      if (this.map !== undefined && this.map.getSource('vehicles') !== undefined) {
        this.map.getSource('vehicles').setData(this.getData());
      }
    }
  }

  pickSource() {
    if (this.props.selectedVehicle != '') {
      return [
        this.props.busVehicleData[this.props.selectedVehicle]
      ];
    }

    let query = this.props.query || '';
    if (query !== '') {
      return this.props.filteredData;
    }

    return Object.values(this.props.busVehicleData);
  }

  getData() {
    const source = this.pickSource()

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
        style={{ height: "100vh" }}
      >
      </div>
      /* jshint ignore:end */
    );
  }
}

MapView.propTypes = {
  busVehicleData: PropTypes.object.isRequired,
  filteredData: PropTypes.array.isRequired,
  selectedVehicle: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  selectVehicle: PropTypes.func.isRequired,
};

export default MapView;
