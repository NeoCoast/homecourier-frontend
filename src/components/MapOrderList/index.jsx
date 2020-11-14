import React, { useRef, useState, useEffect } from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
  Marker,
} from 'react-google-maps';
import { Box } from 'grommet';
import orderServices from 'Api/orders.service';

const MapOrderList = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <Box fill />,
    containerElement: <Box fill />,
    mapElement: <Box fill />,
  }),
  withScriptjs,
  withGoogleMap
)(({
  openModal, openErrorModal, setErrorMsg,
}) => {
  const googleMap = useRef();
  const [ordersList, setOrders] = useState([]);
  const [circles, setCircles] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const mapZoom = 13;

  useEffect(() => {
    setCircles(
      ordersList.map(({ helpee }, i) => (
        <Circle
          key={`circle-${i}`}
          center={{ lat: helpee.latitude, lng: helpee.longitude }}
          radius={300}
          options={{ fillColor: '#87CEEB', strokeColor: '#0087CEEB' }}
        />
      ))
    );

    setMarkers(
      ordersList.map(({ helpee }, i) => (
        <Marker
          key={`marker-${i}`}
          position={{ lat: helpee.latitude, lng: helpee.longitude }}
          icon={{
            url: 'https://image.flaticon.com/icons/png/512/126/126165.png',
            anchor: { x: 15, y: 15 },
            scaledSize: { width: 30, height: 30 },
          }}
          clickable
          onClick={() => openModal(ordersList[i])}
        />
      ))
    );
  }, [ordersList]);

  const getOrdersFirstTime = () => {
    if (firstLoad) {
      setFirstLoad(false);
      getOrders();
    }
  };

  const getOrders = async () => {
    const latTopRight = googleMap.current.getBounds().getNorthEast().lat();
    const lngTopRight = googleMap.current.getBounds().getNorthEast().lng();
    const latDownLeft = googleMap.current.getBounds().getSouthWest().lat();
    const lngDownLeft = googleMap.current.getBounds().getSouthWest().lng();
    try {
      const response = await orderServices.getOrdersMap(latTopRight, lngTopRight, latDownLeft, lngDownLeft);
      setOrders(response);
    } catch (error) {
      setErrorMsg('Se ha producido un error al cargar los pedidos');
      openErrorModal(true);
      console.error('error: ', error);
    }
  };

  return (
    <GoogleMap
      ref={googleMap}
      onDragEnd={getOrders}
      onZoomChanged={getOrders}
      onTilesLoaded={getOrdersFirstTime}
      defaultZoom={mapZoom}
      defaultCenter={{ lat: -34.910241, lng: -56.176663 }}
    >
      {circles}
      {markers}
    </GoogleMap>
  );
});
export default MapOrderList;
