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
  const [orders, setOrders] = useState(false);
  const [createOrderModal, setCreateOrderModal] = useState(false);
  const userInfo = useSelector((state) => state.logUser.data);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await ordersService.getMyOrders(userInfo.id.toString());
        setLoading(false);
        setOrders(res.data);
      } catch (error) {
        setLoading(false);
        console.error('error: ', error);
      }
    };
    if (createOrderModal === false) fetchOrders();
  }, [createOrderModal]);

  const closeModal = () => {
    setCreateOrderModal(false);
  };

  return (
    <Box fill align="center">
      {loading && <Spinner />}
      <Button
        alignSelf="end"
        disabled={loading}
        primary
        icon={<Add color="white" />}
        onClick={() => setCreateOrderModal(true)}
        label="Nuevo Pedido"
        margin={{ right: 'xlarge', vertical: 'small' }}
      />
      {createOrderModal && <CreateOrder closeModal={closeModal} />}
      {orders.length === 0 && !loading && (
        <Heading level="2" textAlign="center">
          Lo sentimos! No hay pedidos en el sistema.
        </Heading>
      )}
      {orders.length > 0 && <OrdersList orders={orders} setLoading={setLoading} />}
    </Box>
  );
};

export default MyOrders;
