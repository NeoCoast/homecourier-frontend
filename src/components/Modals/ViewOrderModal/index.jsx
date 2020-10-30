import React, { useContext } from 'react';
import {
  Layer, Heading, Paragraph, Box, Button, ResponsiveContext,
} from 'grommet';
import { Package, Task, Home } from 'grommet-icons';
import { Close } from 'grommet-icons';
import PropTypes from 'prop-types';
import ChipContainer from 'Components/Utils/ChipContainer';
import UserProfileInfo from 'Components/Utils/UserProfileInfo';
import { ORDER_STATUS_ACTIONS, ORDER_STATUS_PHASE_NUMBER, STEP_DATA } from 'Data/constants';
import Stepper from 'Components/Utils/Stepper';
import MiniStatusDisplay from 'Components/Utils/MiniStateDisplay';
import VolunteerApplicationList from 'Components/VolunteerApplicationsList';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const ViewOrderModal = ({ order, onClose, onConfirm }) => {
  const userData = useSelector((state) => state.logUser.data);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const viewPortSize = useContext(ResponsiveContext);
  const icons = [
    <Package size="large" color="black" />,
    <Task size="large" color="black" />,
    <Home size="large" color="black" />,
  ];

  const volunteerApplied = () => {
    if (userData.documentNumber) {
      const volunteerOrderIds = order.volunteers ? order.volunteers.map((x) => x.id) : [];
      setAlreadyApplied(volunteerOrderIds.includes(userData.id));
    }
  };

  useEffect(() => {
    volunteerApplied();
  }, []);

  return (
    <Layer
      responsive={false}
      onEsc={onClose}
      onClickOutside={onClose}
      margin="small"
      round="large"
      full={viewPortSize === 'small' ? 'horizontal' : false}
    >
      <Box direction="row" justify="between" fill="horizontal" style={{ maxHeight: '66px' }}>
        <Heading level="3" margin={{ horizontal: 'large' }}>
          {order.title}
        </Heading>
        <Button
          onClick={onClose}
          margin={{ top: 'small', bottom: 'none', horizontal: 'small' }}
          icon={<Close />}
          hoverIndicator="accent-2"
          id="close-err-modal"
        />
      </Box>
      <Box direction="row" fill pad="medium" overflow="auto" justify="start">
        <Box pad={{ horizontal: 'large', vertical: 'medium' }} gap="medium" fill>
          { (userData.documentNumber || order.status !== 'created') && <UserProfileInfo user={userData.documentNumber ? order.helpee : order.volunteers[0]} /> }
          {((order.volunteers ? order.volunteers.map((x) => x.id).includes(userData.id) : false)
          || order.helpee.id === userData.id) && order.status !== 'created' && viewPortSize === 'small'
          && (
            <Box alignSelf="start">
              <MiniStatusDisplay activeStep={ORDER_STATUS_PHASE_NUMBER[order.status]} cancelled={order.status === 'cancelled'} />
            </Box>
          )}
          {order.helpee.id === userData.id && order.status === 'created' && viewPortSize === 'small' && (
            <VolunteerApplicationList orderId={order.id} onClose={onClose} />
          )}
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
        {((order.volunteers ? order.volunteers.map((x) => x.id).includes(userData.id) : false)
        || order.helpee.id === userData.id) && order.status !== 'created' && viewPortSize !== 'small'
        && (
          <Stepper
            steps={STEP_DATA.steps}
            stepsLabel={STEP_DATA.stepsLabel}
            stepsContent={STEP_DATA.stepsContent}
            activeStep={ORDER_STATUS_PHASE_NUMBER[order.status]}
            icons={icons}
            cancelled={order.status === 'cancelled'}
          />
        )}

        {order.helpee.id === userData.id && order.status === 'created' && viewPortSize !== 'small' && (
          <Box style={{ minWidth: '400px' }}>
            <VolunteerApplicationList orderId={order.id} onClose={onClose} />
          </Box>
        )}
      </Box>
      <Box direction="row" gap="small" fill justify="end" pad="medium">
        {order.status !== 'created' && order.status !== 'finished' && order.status !== 'cancelled'
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
        {((userData.documentNumber && order.status !== 'in_process')
          || (!userData.documentNumber && order.status === 'in_process'))
          && !(alreadyApplied && order.status === 'created')
          && order.status !== 'finished'
          && order.status !== 'cancelled'
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
