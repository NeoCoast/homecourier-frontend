import React from 'react';
import PropTypes from 'prop-types';
import MapBase from './MapBase';

const Map = ({ center }) => (
  <MapBase
    isMarkerShown
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: '100%' }} />}
    containerElement={<div style={{ height: '300px' }} />}
    mapElement={<div style={{ height: '100%' }} />}
    center={center}
  />
);

Map.propTypes = {
  center: PropTypes.object.isRequired,
};

export default Map;
