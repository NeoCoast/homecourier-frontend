import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs, withGoogleMap, GoogleMap, Circle,
} from 'react-google-maps';

const MapCircle = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '300px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown
    && (
      <Circle
        center={{ lat: props.lat, lng: props.lng }}
        radius={props.radius}
        options={{ fillColor: '#87CEEB', strokeColor: '#0087CEEB' }}
      />
    )}
  </GoogleMap>
));

export default MapCircle;
