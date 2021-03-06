import React from 'react';
import PropTypes from 'prop-types';
import {
  Layer, Box, Paragraph, Button, Heading, Image,
} from 'grommet';
import { Close } from 'grommet-icons';
import success from 'Assets/success.gif';

const SuccesModal = ({
  message, show, setShow, aditionalClose,
}) => {
  const closeModal = () => {
    aditionalClose();
    setShow(false);
  };
  return (
    <Layer
      onEsc={closeModal}
      onClickOutside={closeModal}
      responsive={false}
      margin="xsmall"
    >
      <Box direction="row" align="center" justify="between" fill="horizontal">
        <Heading level="2" margin="medium">
          ¡Éxito!
        </Heading>
        <Button onClick={closeModal} margin="medium" icon={(<Close />)} hoverIndicator="accent-2" id="close-ok-modal" />
      </Box>

      <Box direction="column" gap="small" justify="center" alignContent="center" align="start" margin="medium">
        <Box width="150px" height="150px" justify="center" alignSelf="center">
          <Image fit="contain" src={show ? success : null} />
        </Box>
        <Paragraph textAlign="center" alignSelf="center" fill style={{ minWidth: '300px' }}>
          {message}
        </Paragraph>
      </Box>
    </Layer>
  );
};

SuccesModal.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  aditionalClose: PropTypes.func,
};

SuccesModal.defaultProps = {
  aditionalClose: () => null,
};

export default SuccesModal;
