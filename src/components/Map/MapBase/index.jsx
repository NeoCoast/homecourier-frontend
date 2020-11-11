import React from 'react';
import {
  withScriptjs, withGoogleMap, GoogleMap, Circle,
} from 'react-google-maps';

const MapBase = withScriptjs(withGoogleMap((props) => (
  <GoogleMap defaultZoom={14} defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}>
    {props.isMarkerShown && (
      <Circle
        center={{ lat: props.center.lat, lng: props.center.lng }}
        radius={300}
        options={{ fillColor: '#87CEEB', strokeColor: '#0087CEEB' }}
      />
    )}
  </GoogleMap>
)));

export default MapBase;
