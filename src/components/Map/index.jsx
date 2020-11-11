import React from 'react';
import PropTypes from 'prop-types';
import MapBase from './MapBase';

const Map = ({ center, isMarkerShown }) => (
  <MapBase
    isMarkerShown={isMarkerShown}
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: '100%' }} />}
    containerElement={<div style={{ height: '300px' }} />}
    mapElement={<div style={{ height: '100%' }} />}
    center={center}
  />
);

Map.propTypes = {
  center: PropTypes.object.isRequired,
  isMarkerShown: PropTypes.bool.isRequired,
};

export default Map;
