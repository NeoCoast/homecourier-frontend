import React, { useState, useEffect } from 'react';
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
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCY5hc7YI-a9IowKkfCkkDbuxYq6glpYrI&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <Box fill />,
    containerElement: <Box fill />,
    mapElement: <Box fill />,
  }),
  withScriptjs,
  withGoogleMap
)(({
  openModal, openErrorModal, setErrorMsg,
}) => {
  const [googleMap, setGoogleMap] = useState(React.createRef);
  const [ordersList, setOrders] = useState([]);
  const [circles, setCircles] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const mapZoom = 13;

  useEffect(() => {
    const drawCircles = () => {
      const circlesList = [];
      for (let i = 0; i < ordersList.length; i += 1) {
        circlesList.push(
          <Circle
            key={i}
            center={{ lat: ordersList[i].helpee.latitude, lng: ordersList[i].helpee.longitude }}
            radius={300}
            options={{ fillColor: '#87CEEB', strokeColor: '#0087CEEB' }}
          />
        );
      }
      return circlesList;
    };
    const drawMarkers = () => {
      const markersList = [];
      for (let i = 0; i < ordersList.length; i += 1) {
        markersList.push(
          <Marker
            key={i}
            position={{ lat: ordersList[i].helpee.latitude, lng: ordersList[i].helpee.longitude }}
            icon={{
              url: 'https://image.flaticon.com/icons/png/512/126/126165.png',
              anchor: { x: 15, y: 15 },
              scaledSize: { width: 30, height: 30 },
            }}
            clickable
            onClick={() => openModal(ordersList[i])}
          />
        );
      }
      return markersList;
    };
    setCircles(drawCircles());
    setMarkers(drawMarkers());
  }, [ordersList]);

  const getOrdersFirstTime = () => {
    if (firstLoad) {
      setFirstLoad(false);
      getOrders();
    }
  };

  const getOrders = async () => {
    const latTopRight = googleMap.getBounds().getNorthEast().lat();
    const lngTopRight = googleMap.getBounds().getNorthEast().lng();
    const latDownLeft = googleMap.getBounds().getSouthWest().lat();
    const lngDownLeft = googleMap.getBounds().getSouthWest().lng();
    try {
      const response = await orderServices.getOrdersMap(latTopRight, lngTopRight, latDownLeft, lngDownLeft);
      setOrders(response);
      console.log(response);
    } catch (error) {
      setErrorMsg('Se ha producido un error al cargar los pedidos');
      openErrorModal(true);
      console.error('error: ', error);
    }
  };

  return (
    <GoogleMap
      ref={(gmap) => setGoogleMap(gmap)}
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
