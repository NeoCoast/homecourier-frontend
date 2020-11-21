import React, { useState, useEffect } from 'react';
import { Box, Heading } from 'grommet';
import ordersService from 'Api/orders.service';
import OrdersList from 'Components/OrdersList';
import Spinner from 'Components/Utils/Spinner';
import { useSelector } from 'react-redux';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewOrderModal, setViewOrderModal] = useState(true);
  const userData = useSelector((state) => state.logUser.data);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await ordersService.getOrders('created');
        setLoading(false);
        setOrders(res.data);
        setViewOrderModal(false);
      } catch (error) {
        setLoading(false);
        console.error('error: ', error);
      }
    };
    if (viewOrderModal) fetchOrders();
  }, [viewOrderModal]);

  const ordersForDistance = async (ascDesc) => {
    try {
      setLoading(true);
      const res = await ordersService.ordersForDistance(userData.id, ascDesc);
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const ordersForAntiquity = async (ascDesc) => {
    try {
      setLoading(true);
      const res = await ordersService.ordersForAntiquity('created', ascDesc);
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const filter = (option) => {
    switch (option) {
      case 'Distancia descendente': {
        ordersForDistance('desc');
        break;
      }
      case 'Distancia ascendente': {
        ordersForDistance('asc');
        break;
      }
      case 'Pedidos más nuevos': {
        ordersForAntiquity('desc');
        break;
      }
      case 'Pedidos más antiguos': {
        ordersForAntiquity('asc');
        break;
      }
      default:
        break;
    }
  };

  return (
    <Box id="box" fill align="center">
      {loading && <Spinner />}
      {orders.length === 0 && !loading && (
        <Heading level="2" textAlign="center">
          ¡Lo sentimos! No hay pedidos en el sistema.
        </Heading>
      )}
      {orders.length > 0 && <OrdersList orders={orders} setLoading={setLoading} modalClosed={setViewOrderModal} onChange={filter} />}
    </Box>
  );
};

export default Orders;
