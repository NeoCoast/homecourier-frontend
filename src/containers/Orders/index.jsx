import React, { useState, useEffect } from 'react';
import { Box, Heading } from 'grommet';
import ordersService from 'Api/orders.service';
import OrdersList from 'Components/OrdersList';
import Spinner from 'Components/Utils/Spinner';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Orders = () => {
  const loggedIn = useSelector((state) => state.logUser.loggedIn);
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!loggedIn) history.push('/');
    else {
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
    }
  }, []);

  return (
    <Box id="box" fill align="center">
      {loading && <Spinner />}
      {orders.length === 0 && !loading && (
        <Heading level="2" textAlign="center">
          Lo sentimos! No hay pedidos en el sistema.
        </Heading>
      )}
      {orders.length > 0 && <OrdersList orders={orders} setLoading={setLoading} />}
    </Box>
  );
};

export default Orders;
