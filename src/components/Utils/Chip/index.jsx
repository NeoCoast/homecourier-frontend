import { Box, Text } from 'grommet';
import React from 'react';
import PropTypes from 'prop-types';

const Chip = ({ text }) => (
  <Box
    background="accent-1"
    round="large"
    pad={{ horizontal: '15px', vertical: '3px' }}
    fill={false}
    style={{ height: '2em' }}
  >
    <Text size="small">{text}</Text>
  </Box>
);

Chip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Chip;
