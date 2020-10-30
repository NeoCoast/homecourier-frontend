import React, { useContext } from 'react';
import {
  Layer, Heading, Box, Button, ResponsiveContext, Card, CardHeader, CardBody, CardFooter,
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
import MultilineText from '../../Utils/MultilineText';

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
      <Card>
        <CardHeader>
          <Box justify="between" fill direction="row">
            <Heading level="3" margin={{ horizontal: 'large', vertical: 'medium' }} gridArea="title">
              {order.title}
            </Heading>
            <Button
              onClick={onClose}
              margin="small"
              icon={<Close />}
              hoverIndicator="accent-2"
              id="close-err-modal"
              gridArea="close"
            />
          </Box>
        </CardHeader>
        <CardBody>
          <Box
            direction="row"
            gap="small"
            fill
          >
            <Box
              style={{ minWidth: '291px' }}
              pad={{ horizontal: 'large', vertical: 'medium' }}
              gap="medium"
              fill
            >
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
              <Box style={{ maxHeight: '35vh' }}>
                <Heading level="4" margin={{ vertical: 'small', horizontal: 'none' }}>
                  Descripción
                </Heading>
                <MultilineText text={order.description} />
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
              <Box style={{ minWidth: '400px' }} fill>
                <VolunteerApplicationList orderId={order.id} onClose={onClose} />
              </Box>
            )}
          </Box>
        </CardBody>
        <CardFooter pad="small" justify="end">
          {order.status !== 'created' && order.status !== 'finished' && order.status !== 'cancelled'
        && (
          <Button
            secondary
            label="Cancelar pedido"
            hoverIndicator="accent-2"
            size={viewPortSize === 'small' ? 'small' : 'medium'}
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
              size={viewPortSize === 'small' ? 'small' : 'medium'}
              onClick={() => {
                onConfirm(order.id);
                onClose();
              }}
            />
          )}
        </CardFooter>
      </Card>
    </Layer>
  );
};

ViewOrderModal.propTypes = {
  order: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ViewOrderModal;
