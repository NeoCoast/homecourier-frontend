import { Box, Text } from 'grommet';
import React from 'react';
import 'react-step-progress-bar/styles.css';
import { ProgressBar } from 'react-step-progress-bar';
import PropTypes from 'prop-types';

const CalificationGradient = ({ percent, maxRating }) => (
  <Box pad={{ vertical: 'small' }}>
    <ProgressBar percent={percent} filledBackground="linear-gradient(to right, #EF626C, #77dd77)" width="50" />
    <Text size="small">{(percent * maxRating) / 100}/{maxRating}</Text>
  </Box>
);

CalificationGradient.propTypes = {
  percent: PropTypes.number.isRequired,
  maxRating: PropTypes.number.isRequired,
};

export default CalificationGradient;
