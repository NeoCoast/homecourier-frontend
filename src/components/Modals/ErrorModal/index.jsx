import React from 'react';
import PropTypes from 'prop-types';
import {
  Layer, Box, Paragraph, Button, Heading, Image,
} from 'grommet';
import { Close } from 'grommet-icons';
import error from 'Assets/error.gif';

const ErrorModal = ({ errorMessage, show, setShow }) => (
  <Layer onEsc={() => setShow(false)} onClickOutside={() => setShow(false)} responsive={false} margin="xsmall">
    <Box direction="row" align="start">
      <Heading level="2" margin="medium">
        Lo Sentimos! Ha ocurrido error.
      </Heading>
      <Button onClick={() => setShow(false)} margin="medium" icon={(<Close />)} hoverIndicator="accent-2" />
    </Box>

    <Box
      direction="column"
      gap="small"
      justify="center"
      alignContent="center"
      align="start"
      pad={{ bottom: 'medium' }}
    >
      <Box width="150px" height="150px" justify="center" alignSelf="center">
        <Image fit="contain" src={show ? error : null} />
      </Box>
      <Paragraph textAlign="center" alignSelf="center" fill style={{ minWidth: '300px' }}>
        {errorMessage}
      </Paragraph>
    </Box>
  </Layer>
);

ErrorModal.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default ErrorModal;
