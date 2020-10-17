/* eslint-disable no-plusplus */
import React from 'react';
import {
  Stack, Box, Text,
} from 'grommet';
import PropTypes from 'prop-types';
import {
  Home, Task, Package, StatusCritical, StatusCriticalSmall,
} from 'grommet-icons';

// Props:
//     -steps: Amount of items to complete in the Stepper. Array of int.
//     -activeStep: item that is now selected. THIS PROP IS REQUIRED!
//     -stepsLabel: Label to put under each item in the Stepper.
//     -stepsContent: Text under the bar that describes the actual step.
//     -cancelled: In case the Stepper is now invalid, (Order cancelled),
//                 the colour and icons will change to represent failure.
//       -cancelledText: Text to show when cancelled

const Stepper = (props) => {
  const { activeStep } = props;
  const { stepsLabel } = props;
  const { cancelled } = props;
  const { cancelledText } = props;
  const cancelledSteps = [1, 2, 3];
  const { icons } = props;

  return (
    <Box>
      {cancelled && (
        <Box align="center">
          <Box>
            <Box direction="column" gap="xlarge">
              {cancelledSteps.map((value) => (
                <Box margin="small" key={value}>
                  <Stack alignSelf="center">
                    <StatusCriticalSmall size="large" color="accent-2" />
                    <StatusCritical id={String(value)} size="large" color="black" />
                  </Stack>
                </Box>
              ))}
            </Box>
            <Text textAlign="center" margin="medium" size="large">
              {cancelledText}
            </Text>
          </Box>
        </Box>
      )}
      {!cancelled && (
        <Box align="center">
          <Box direction="column" gap="medium">
            <Box direction="row" align="center">
              <Box>
                <Box margin="small" direction="row" align="center">
                  { icons[activeStep - 1] }
                  <Text textAlign="center" margin="small">{stepsLabel[activeStep - 1]}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

Stepper.propTypes = {
  activeStep: PropTypes.number,
  stepsLabel: PropTypes.array,
  cancelled: PropTypes.bool,
  cancelledText: PropTypes.string,
  icons: PropTypes.array,
};

Stepper.defaultProps = {
  activeStep: 1,
  stepsLabel: [
    'Orden tomada',
    'Realizando orden',
    'Entregado',
  ],
  cancelled: false,
  cancelledText: 'La orden ha sido cancelada',
  icons: [
    <Package size="large" color="black" />,
    <Task size="large" color="black" />,
    <Home size="large" color="black" />,
  ],
};

export default Stepper;
