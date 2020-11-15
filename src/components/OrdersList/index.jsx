import React, { useState, useContext } from 'react';
import {
  Box, Button, InfiniteScroll, ResponsiveContext,
} from 'grommet';
import PropTypes from 'prop-types';
import ordersService from 'Api/orders.service';
import { useSelector } from 'react-redux';
import OrderCard from 'Components/OrderCard';
import ViewOrderModal from 'Components/Modals/ViewOrderModal';
import ErrorModal from 'Components/Modals/ErrorModal';
import SuccessModal from 'Components/Modals/SuccessModal';
import RateOrder from 'Containers/RateOrder';
import { NEXT_STATUS } from 'Data/constants';
import MapOrderList from 'Components/MapOrderList';
import { List, Map } from 'grommet-icons';

const OrdersList = ({
  orders, setLoading, modalClosed,
}) => {
  const takeOrder = async (orderId) => {
    try {
      setLoading(true);
      await ordersService.take({
        volunteerId,
        orderId,
      });
      setLoading(false);
      setMessage('¡Se ha postulado para realizar la orden!');
      setSuccessModal(true);
    } catch (error) {
      setLoading(false);
      if (error.message.match(/406/)) {
        setMessage('Otro voluntario ya fue aceptado.');
      } else {
        setMessage('Hubo un error.');
      }
      setErrorModal(true);
    }
  };
  const setOrderStatus = async ({ orderId, status }) => {
    try {
      setLoading(true);
      await ordersService.setOrderStatus({
        orderId,
        status,
      });
      setLoading(false);
      if (status === 'in_process') {
        setMessage('¡Ha iniciado el pedido!');
        setSuccessModal(true);
      }
      if (status === 'finished') {
        setShowRating(true);
      }
      if (status === 'cancelled') {
        setMessage('Se ha cancelado la orden correctamente.');
        setSuccessModal(true);
      }
      modalClosed(true);
    } catch (error) {
      setLoading(false);
      setMessage('Hubo un error.');
      setErrorModal(true);
    }
  };

  const orderAction = (orderId, cancel = false) => {
    const orderStatus = orders.find((order) => order.id === orderId).status;
    const status = (cancel) ? 'cancelled' : NEXT_STATUS[orderStatus];

    switch (orderStatus) {
      case 'created':
        if (cancel) setOrderStatus({ orderId, status });
        else takeOrder(orderId);
        break;
      case 'accepted':
        setOrderStatus({ orderId, status });
        break;
      case 'in_process':
        setOrderStatus({ orderId, status });
        break;
      case 'cancelled':
        setOrderStatus({ orderId, status });
        break;
      default:
        break;
    }
  };

  const volunteerId = useSelector((state) => state.logUser.data.id);
  const isVolunteer = undefined !== useSelector((state) => state.logUser.data.documentNumber);
  const [viewOrderModal, setViewOrderModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [message, setMessage] = useState('');
  const viewportSize = useContext(ResponsiveContext);
  const [orderSelected, setOrderSelected] = useState(null);
  const [isMapEnabled, setIsMapEnabled] = useState(false);

  const openModal = (order) => {
    setOrderSelected(order);
    setViewOrderModal(true);
  };

  const closeModal = () => {
    setViewOrderModal(false);
    modalClosed(true);
  };

  return (
    <Box fill={isMapEnabled} overflow="auto" flex={false}>

      {isVolunteer && (
        <Box
          direction="row"
          alignSelf="end"
          background="white"
          border="black"
          margin={{ top: 'medium', right: 'medium', bottom: 'xsmall' }}
        >
          <Button
            icon={(<List />)}
            onClick={() => setIsMapEnabled(false)}
          />
          <Button
            icon={(<Map />)}
            onClick={() => setIsMapEnabled(true)}
          />
        </Box>
      )}
      {!isMapEnabled && (
        <InfiniteScroll
          direction="column"
          pad={{ horizontal: viewportSize === 'small' ? 'small' : 'medium', vertical: 'medium' }}
          overflow="auto"
          fill
          items={orders}
        >
          {(order) => (
            <OrderCard order={order} viewportSize={viewportSize} key={order.id} openModal={openModal} />
          )}
        </InfiniteScroll>
      )}
      {isMapEnabled && (
        <Box
          pad={{ left: 'medium', right: 'medium', bottom: 'medium' }}
          fill
        >
          <MapOrderList setLoading={setLoading} openModal={openModal} openErrorModal={setErrorModal} setErrorMsg={setMessage} />
        </Box>
      )}

      {errorModal && <ErrorModal setShow={setErrorModal} show={errorModal} errorMessage={message} />}
      {successModal && <SuccessModal setShow={setSuccessModal} show={successModal} message={message} />}
      {viewOrderModal && <ViewOrderModal order={orderSelected} onClose={closeModal} onConfirm={orderAction} />}
      {showRating && <RateOrder orderId={orderSelected.id} show={showRating} setShow={setShowRating} title="Califique al voluntario" />}
    </Box>

  );
};

OrdersList.propTypes = {
  orders: PropTypes.array.isRequired,
  setLoading: PropTypes.func.isRequired,
  modalClosed: PropTypes.func.isRequired,
};

export default OrdersList;
