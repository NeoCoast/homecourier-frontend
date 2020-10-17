import React from 'react';
import {
  Layer, Heading, Paragraph, Box, Button,
} from 'grommet';
import { Close } from 'grommet-icons';
import PropTypes from 'prop-types';
import ChipContainer from 'Components/Utils/ChipContainer';
import UserProfileInfo from 'Components/Utils/UserProfileInfo';
import { ORDER_STATUS_ACTIONS, ORDER_STATUS_PHASE_NUMBER } from 'Data/constants';
import Stepper from 'Components/Utils/Stepper';
import VolunteerApplicationList from 'Components/VolunteerApplicationsList';
import { useSelector } from 'react-redux';
import ordersService from 'Api/orders.service';
import { useState, useEffect } from 'react';

const ViewOrderModal = ({ order, onClose, onConfirm }) => {
  const userData = useSelector((state) => state.logUser.data);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const volunteerApplied = async () => {
    if (userData.documentNumber) {
      const volunteersOrders = await ordersService.getVolunteerOrders(userData.id.toString());
      const volunteerOrderIds = volunteersOrders.data ? volunteersOrders.data.map((x) => x.id) : [];
      setAlreadyApplied(volunteerOrderIds.includes(order.id));
    }
    return false;
  };

  useEffect(() => {
    console.log(order);
    volunteerApplied();
  }, []);

  return (
    <Layer responsive={false} onEsc={onClose} onClickOutside={onClose} margin="xlarge" round="large">
      <Box direction="row" justify="between" fill="horizontal">
        <Heading level="3" margin={{ horizontal: 'large' }}>
          {order.title}
        </Heading>
        <Button onClick={onClose} margin="medium" icon={(<Close />)} hoverIndicator="accent-2" id="close-err-modal" />
      </Box>
      <Box direction="row" fill pad="medium">
        <Box pad={{ horizontal: 'large', vertical: 'medium' }} gap="medium" fill>
          <UserProfileInfo user={order.helpee} />
          <Box>
            <Heading level="4" margin={{ vertical: 'small', horizontal: 'none' }}>
              Categorías
            </Heading>
            <ChipContainer items={order.categories} label="description" />
          </Box>
          <Box>
            <Heading level="4" margin={{ vertical: 'small', horizontal: 'none' }}>
              Descripción
            </Heading>
            <Paragraph size="small" margin="none" fill>
              {order.description}
            </Paragraph>
          </Box>
        </Box>
        {order.helpee.id === userData.id && order.status !== 'created' && <Stepper activeStep={ORDER_STATUS_PHASE_NUMBER[order.status]} />}
        {order.helpee.id === userData.id && order.status === 'created' && <VolunteerApplicationList orderId={order.id} />}
      </Box>
      <Box direction="row" gap="small" fill justify="end" pad="medium">
        {order.status !== 'created' && order.status !== 'finished'
        && (
          <Button
            secondary
            label="Cancelar Pedido"
            hoverIndicator="accent-2"
            onClick={() => {
              onConfirm(order.id, true);
              onClose();
            }}
          />
        )}
        { userData.documentNumber && !(alreadyApplied && order.status === 'created') && order.status !== 'finished'
        && (
          <Button
            primary
            label={ORDER_STATUS_ACTIONS[order.status]}
            onClick={() => {
              onConfirm(order.id);
              onClose();
            }}
          />
        )}
      </Box>
    </Layer>
  );
};

ViewOrderModal.propTypes = {
  order: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ViewOrderModal;
