import React, { useState, useContext } from 'react';
import { Box, InfiniteScroll, ResponsiveContext } from 'grommet';
import PropTypes from 'prop-types';
import ordersService from 'Api/orders.service';
import { useSelector } from 'react-redux';
import OrderCard from 'Components/OrderCard';
import ViewOrderModal from 'Components/Modals/ViewOrderModal';
import ErrorModal from 'Components/Modals/ErrorModal';
import SuccessModal from 'Components/Modals/SuccessModal';
import { NEXT_STATUS } from 'Data/constants'

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

  const setOrderStatus = async ({ orderId, status }) => {
    try {
      setLoading(true);
      await ordersService.setOrderStatus({
        orderId,
        status,
      });
      setLoading(false);
      if( status === 'finished' ) {
        setOrderList( orderList => orderList.filter( order => order.id != orderId))
      }
      setMessage('Su pedido ha sido finalizado');
      setSuccessModal(true);
    } catch (error) {
      setLoading(false);
      setMessage('Hubo un error.');
      setErrorModal(true);
    }
  };

  const orderAction = (orderId, cancel = false ) => {
    var orderStatus = orders.find(order => order.id === orderId).status
    const status = (cancel) ? 'cancelled' : NEXT_STATUS[orderStatus]

    switch (orderStatus) {
      case 'created':
        takeOrder(orderId)
      break;

      case 'in_process':
          setOrderStatus( { orderId, status} )
        break;
      default:
        break;
    }
  }
  const volunteerId = useSelector((state) => state.logUser.data.id);
  const [orderList, setOrderList] = useState(orders);
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
    <Box overflow="auto" flex={false}>

      <InfiniteScroll

        direction="column"
        pad={{ horizontal: viewportSize === 'small' ? 'small' : '20vw', vertical: 'medium' }}
        overflow="auto"
        fill
        items={orderList}
      >
        {(order) => (
          <OrderCard order={order} viewportSize={viewportSize} key={order.id} openModal={openModal} />
        )}
      </InfiniteScroll>

      {errorModal && <ErrorModal setShow={setErrorModal} show={errorModal} errorMessage={message} />}
      {successModal && <SuccessModal setShow={setSuccessModal} show={successModal} message={message} />}
      {viewOrder && <ViewOrderModal order={orderSelected} onClose={closeModal} onConfirm={orderAction} />}
    </Box>

  );
};

OrdersList.propTypes = {
  orders: PropTypes.array.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default OrdersList;
