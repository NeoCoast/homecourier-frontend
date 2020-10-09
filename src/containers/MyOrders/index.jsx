import React, { useEffect, useState } from 'react';
import ordersService from 'Api/orders.service';
import { Box, Heading } from 'grommet';
import OrdersList from 'Components/OrdersList';
import Spinner from 'Components/Utils/Spinner';
import CreateOrder from '../../components/Modals/CreateOrder';

const MyOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await ordersService.getOrders('created');
        setLoading(false);
        setOrders(res.data);
      } catch (error) {
        setLoading(false);
        console.error('error: ', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Box fill align="center">
      {loading && <Spinner />}
      <CreateOrder />
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
