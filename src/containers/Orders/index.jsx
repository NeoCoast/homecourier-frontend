import React, { useState, useEffect } from 'react';
import './index.scss';
import { Box } from 'grommet';
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
          const res = await ordersService.getOrders();
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
    <Box id="box" fill="vertical">
      {loading && <Spinner />}
      {orders.length > 0 && <OrdersList orders={orders} setLoading={setLoading} />}
    </Box>
  );
};

export default Orders;
