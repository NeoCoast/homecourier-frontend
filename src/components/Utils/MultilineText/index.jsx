/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paragraph } from 'grommet';
const MultilineText = ({ text }) => {
  const splittedText = text.split('\n');
  return (
    <Box overflow="auto">
      {
        splittedText.map((item, index) => <Paragraph key={index}>{item}</Paragraph>)
      }
    </Box>
  );
};

MultilineText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default MultilineText;
