import React, { useState, useContext } from 'react';
import './index.scss';
import {
  Box,
  ResponsiveContext,
} from 'grommet';
import PropTypes from 'prop-types';
import ordersService from 'Api/orders.service';
import { useSelector } from 'react-redux';
import OrderCard from 'Components/OrderCard';
import ViewOrderModal from 'Components/Modals/ViewOrderModal';
import ErrorModal from 'Components/Modals/ErrorModal';
import SuccessModal from 'Components/Modals/SuccessModal';

const OrdersList = ({ orders, setLoading }) => {
  const takeOrder = async (orderId) => {
    try {
      setLoading(true);
      await ordersService.take({
        volunteerId,
        orderId,
      });
      setLoading(false);
      setMessage('Ha tomado la orden! Gracias por ayudar!');
      setSuccessModal(true);
    } catch (error) {
      setLoading(false);
      setMessage('Hubo un error.');
      setErrorModal(true);
    }
  };
  const volunteerId = useSelector((state) => state.logUser.data.id);

  const [viewOrder, setViewOrder] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [message, setMessage] = useState('');
  const viewportSize = useContext(ResponsiveContext);
  const [orderSelected, setOrderSelected] = useState(null);

  const openModal = (order) => {
    setOrderSelected(order);
    setViewOrder(true);
  };

  const closeModal = () => {
    setViewOrder(false);
  };

  return (
    <Box
      background="white"
      direction="column"
      pad={{ horizontal: viewportSize === 'small' ? 'small' : '20vw', vertical: 'medium' }}
      overflow="scroll"
    >
      {orders.map((order) => (
        <OrderCard order={order} viewportSize={viewportSize} key={order.id} openModal={openModal} />
      ))}
      {errorModal && <ErrorModal setShow={setErrorModal} show={errorModal} errorMessage={message} />}
      {successModal && <SuccessModal setShow={setSuccessModal} show={successModal} message={message} />}
      {viewOrder && <ViewOrderModal order={orderSelected} onClose={closeModal} onConfirm={takeOrder} />}
    </Box>
  );
};

OrdersList.propTypes = {
  orders: PropTypes.array.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default OrdersList;
