import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ordersService from 'Api/orders.service';
import { Box, Heading, Button } from 'grommet';
import { Add } from 'grommet-icons';
import OrdersList from 'Components/OrdersList';
import Spinner from 'Components/Utils/Spinner';
import CreateOrder from 'Components/Modals/CreateOrder';

const MyOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [createOrderModal, setCreateOrderModal] = useState(false);
  const [viewOrderModal, setViewOrderModal] = useState(true);
  const userInfo = useSelector((state) => state.logUser.data);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let response;
      if (!userInfo.documentNumber) response = await ordersService.getMyOrders(userInfo.id.toString());
      else response = await ordersService.getVolunteerOrders(userInfo.id.toString());
      setLoading(false);
      setOrders(response.data);
    } catch (error) {
      setLoading(false);
      console.error('error: ', error);
    }
  };

  useEffect(() => {
    if (!createOrderModal) fetchOrders();
  }, [createOrderModal]);

  useEffect(() => {
    if (viewOrderModal) {
      fetchOrders();
      setViewOrderModal(false);
    }
  }, [viewOrderModal]);

  const closeModal = () => {
    setCreateOrderModal(false);
  };

  return (
    <Box fill align="center">
      {loading && <Spinner />}
      {!userInfo.documentNumber
      && (
        <Button
          alignSelf="end"
          disabled={loading}
          primary
          icon={<Add color="white" />}
          onClick={() => setCreateOrderModal(true)}
          label="Nuevo pedido"
          margin={{ right: 'xlarge', vertical: 'small' }}
        />
      )}
      {createOrderModal && <CreateOrder closeModal={closeModal} />}
      {orders.length === 0 && !loading && (
        <Heading level="2" textAlign="center">
          Lo sentimos! No hay pedidos en el sistema.
        </Heading>
      )}
      {orders.length > 0 && <OrdersList orders={orders} setLoading={setLoading} modalClosed={setViewOrderModal} />}
    </Box>
  );
};

export default MyOrders;
