import React from 'react';
import {
  Layer, Heading, Paragraph, Box, Button,
} from 'grommet';
import PropTypes from 'prop-types';
import ChipContainer from 'Components/Utils/ChipContainer';
import UserProfileInfo from '../../Utils/UserProfileInfo';

const ViewOrderModal = ({ order, onClose, onConfirm }) => (
  <Layer responsive={false} onEsc={onClose} onClickOutside={onClose} full="horizontal" margin="xlarge">
    <Heading level="3" margin="large">
      {order.title}
    </Heading>
    <Box pad="large" gap="medium" fill>
      <UserProfileInfo user={order.helpee} />
      <Box>
        <Heading level="4" margin="none">
          Categorías
        </Heading>
        <ChipContainer items={order.categories} label="description" />
      </Box>
      <Box>
        <Heading level="4" margin="none">
          Descripción
        </Heading>
        <Paragraph size="small" fill>
          {order.description}
        </Paragraph>
      </Box>
      <Box direction="row" gap="small" fill justify="end">
        <Button secondary label="Cancelar" onClick={onClose} />
        <Button
          primary
          label="Postularse"
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
