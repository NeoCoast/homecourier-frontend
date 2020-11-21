import React, { useState, useContext } from 'react';
import {
  Box, Button, InfiniteScroll, ResponsiveContext, Select,
} from 'grommet';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import OrderCard from 'Components/OrderCard';
import ViewOrderModal from 'Components/Modals/ViewOrderModal';
import ErrorModal from 'Components/Modals/ErrorModal';
import SuccessModal from 'Components/Modals/SuccessModal';
import RateOrder from 'Containers/RateOrder';
import MapOrderList from 'Components/MapOrderList';
import { List, Map } from 'grommet-icons';
import { orderAction } from 'Helpers/order-actions.helper';

const OrdersList = ({
  orders, setLoading, modalClosed, isMyOrders, onChange,
}) => {
  const executeAction = (orderId, cancel = false) => {
    const orderStatus = orders.find((order) => order.id === orderId).status;
    const callbacks = {
      setLoading,
      setMessage,
      setSuccessModal,
      setShowRating,
      setErrorModal,
      modalClosed,
    };
    orderAction(orderId, cancel, orderStatus, callbacks, volunteerId);
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

  const handleFilter = async (option) => {
    await onChange(option);
  };

  return (
    <Box fill={isMapEnabled} overflow="auto" flex={false}>

      {isVolunteer && !isMyOrders && (
        <Box
          direction="row"
          alignSelf="end"
          margin={{ top: 'medium', right: 'medium', bottom: 'xsmall' }}
          basis="xxsmall"
        >
          {!isMapEnabled && (
            <Select
              options={['Distancia ascendente', 'Distancia descendente', 'Pedidos más nuevos', 'Pedidos más antiguos']}
              placeholder="Ordene los pedidos"
              size="small"
              onChange={({ option }) => handleFilter(option)}
              margin={{ right: 'xlarge' }}
            />
          )}
          <Box
            direction="row"
            alignSelf="end"
            background="white"
            style={{ border: '1px solid grey' }}
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
      {viewOrderModal && <ViewOrderModal order={orderSelected} onClose={closeModal} onConfirm={executeAction} />}
      {showRating && <RateOrder orderId={orderSelected.id} show={showRating} setShow={setShowRating} title="Califique al voluntario" />}
    </Box>

  );
};

OrdersList.defaultProps = {
  isMyOrders: false,
  onChange: false,
};

OrdersList.propTypes = {
  orders: PropTypes.array.isRequired,
  setLoading: PropTypes.func.isRequired,
  modalClosed: PropTypes.func.isRequired,
  isMyOrders: PropTypes.bool,
  onChange: PropTypes.func,
};

export default OrdersList;
