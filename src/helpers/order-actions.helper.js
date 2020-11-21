/* eslint-disable import/prefer-default-export */
import ordersService from 'Api/orders.service';
import { NEXT_STATUS } from 'Data/constants';

export const takeOrder = async (orderId, volunteerId, {
  setLoading, setMessage, setSuccessModal, setErrorModal,
}) => {
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

export const setOrderStatus = async ({ orderId, status }, {
  setLoading, setMessage, setSuccessModal, setErrorModal, setShowRating, modalClosed,
}) => {
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

export const orderAction = (orderId, cancel = false, orderStatus, callbacks, volunteerId) => {
  const status = (cancel) ? 'cancelled' : NEXT_STATUS[orderStatus];

  switch (orderStatus) {
    case 'created':
      if (cancel) setOrderStatus({ orderId, status }, callbacks);
      else takeOrder(orderId, volunteerId, callbacks);
      break;
    case 'accepted':
      setOrderStatus({ orderId, status }, callbacks);
      break;
    case 'in_process':
      setOrderStatus({ orderId, status }, callbacks);
      break;
    case 'cancelled':
      setOrderStatus({ orderId, status }, callbacks);
      break;
    default:
      break;
  }
};
