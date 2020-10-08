import { Box } from 'grommet';
import React from 'react';
import Chip from 'Components/Utils/Chip';
import PropTypes from 'prop-types';

const ChipContainer = ({ items, label }) => (
  <Box direction="row" gap="small" wrap fill="horizontal">
    {items.map((item) => (
      <Chip text={item[label]} key={item[label]} />
    ))}
  </Box>
);

ChipContainer.propTypes = {
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export default ChipContainer;
