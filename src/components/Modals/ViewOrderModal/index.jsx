import React from 'react';
import {
  Layer, Heading, Paragraph, Box, Button,
} from 'grommet';
import PropTypes from 'prop-types';
import ChipContainer from 'Components/Utils/ChipContainer';
import UserProfileInfo from 'Components/Utils/UserProfileInfo';
import { ORDER_STATUS_ACTIONS } from 'Data/constants';

const ViewOrderModal = ({ order, onClose, onConfirm }) => (
  <Layer responsive={false} onEsc={onClose} onClickOutside={onClose} full="horizontal" margin="xlarge" round="large">
    <Heading level="3" margin={{ horizontal: 'large', top: 'large', bottom: 'none' }}>
      {order.title}
    </Heading>
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
      <Box direction="row" gap="small" fill justify="end">
        <Button secondary label="Cancelar" onClick={onClose} />
        <Button
          primary
          label={ORDER_STATUS_ACTIONS[order.status]}
          onClick={() => {
            onConfirm(order.id);
            onClose();
          }}
        />
      </Box>
    </Box>
  </Layer>
);

ViewOrderModal.propTypes = {
  order: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ViewOrderModal;
