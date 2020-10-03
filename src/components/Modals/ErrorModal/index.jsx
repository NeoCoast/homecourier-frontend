import React from 'react';
import PropTypes from 'prop-types';
import {
  Layer, Box, Paragraph, Button, Heading, Image,
} from 'grommet';
import error from 'Assets/error.gif';

const ErrorModal = ({ errorMessage, show, setShow }) => (
  <Layer onEsc={() => setShow(false)} onClickOutside={() => setShow(false)} responsive={false} margin="xsmall">
    <Heading level="2" alignSelf="center" margin="medium" fill>
      Lo Sentimos! Ha ocurrido error.
    </Heading>
    <Box
      direction="column"
      gap="small"
      justify="center"
      alignContent="center"
      align="start"
      margin="medium"
    >
      <Box width="150px" height="150px" justify="center" alignSelf="center">
        <Image fit="contain" src={show ? error : null} />
      </Box>
      <Paragraph textAlign="center" alignSelf="center" fill style={{ minWidth: '300px' }}>
        {errorMessage}
      </Paragraph>
    </Box>
    <Button primary alignSelf="end" onClick={() => setShow(false)} label="Ok" margin="medium" />
  </Layer>
);

ErrorModal.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default ErrorModal;
