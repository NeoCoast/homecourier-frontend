/* eslint-disable no-plusplus */
import React from 'react';
import {
  Stack, Box, Diagram, Text,
} from 'grommet';
import PropTypes from 'prop-types';
import {
  Home, Deliver, Task, Package, StatusGoodSmall, StatusGood, StatusCritical, StatusCriticalSmall,
} from 'grommet-icons';

const connection = (fromTarget, toTarget, { color, ...rest } = {}) => ({
  fromTarget,
  toTarget,
  color: (color || 'accent-1'),
  thickness: 'xsmall',
  round: true,
  type: 'rectilinear',
  ...rest,
});

// Props:
//     -steps: Amount of items to complete in the Stepper. Array of int.
//     -activeStep: item that is now selected. THIS PROP IS REQUIRED!
//     -stepsLabel: Label to put under each item in the Stepper.
//     -stepsContent: Text under the bar that describes the actual step.
//     -cancelled: In case the Stepper is now invalid, (Order cancelled),
//                 the colour and icons will change to represent failure.
//       -cancelledText: Text to show when cancelled

const Stepper = (props) => {
  const { steps } = props;
  const { activeStep } = props;
  const { stepsLabel } = props;
  const { stepsContent } = props;
  const { cancelled } = props;
  const { cancelledText } = props;
  const cancelledSteps = [1, 2, 3];
  const { icons } = props;

  const stepsArray = Array.from({ length: steps }, (_, i) => i + 1);

  return (
    <Box>
      {cancelled && (
        <Box align="center">
          <Stack guidingChild={1}>
            <Diagram
              connections={[
                {
                  fromTarget: '1',
                  toTarget: '3',
                  thickness: 'xsmall',
                  color: 'accent-2',
                },
              ]}
            />
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
          </Stack>
        </Box>
      )}
      {!cancelled && (
        <Stack guidingChild={1}>
          <Diagram
            connections={[
              connection('1', String(activeStep), { color: '#b3ddb4' }),
              connection(String(activeStep), String(steps), { color: 'light-5' }),
            ]}
          />
          <Box align="center">
            <Box direction="column" gap="medium">
              {stepsArray.map((value, index) => (
                <Box direction="row" align="center" key={value}>
                  {stepsArray.indexOf(activeStep) >= index
                   && (
                     <Stack>
                       <StatusGoodSmall size="large" color="#b3ddb4" />
                       <StatusGood id={String(value)} size="large" color="black" />
                     </Stack>
                   )}
                  {stepsArray.indexOf(activeStep) < index
                   && (
                     <Stack>
                       <StatusGoodSmall size="large" color="light-3" />
                       <StatusGood id={String(value)} size="large" color="light-3" />
                     </Stack>
                   )}
                  <Box>
                    <Box margin="small" direction="row" align="center">
                      { icons[index] }
                      <Text textAlign="center" margin="small">{stepsLabel[index]}</Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Text alignText="center" size="large" margin="medium">
              {stepsContent[activeStep - 1]}
            </Text>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

Stepper.propTypes = {
  steps: PropTypes.number,
  activeStep: PropTypes.number,
  stepsLabel: PropTypes.array,
  stepsContent: PropTypes.array,
  cancelled: PropTypes.bool,
  cancelledText: PropTypes.string,
  icons: PropTypes.array,
};

Stepper.defaultProps = {
  steps: 4,
  activeStep: 1,
  stepsLabel: [
    'Orden tomada',
    'Realizando orden',
    'En camino',
    'Entregado',
  ],
  stepsContent: [
    'El voluntario se dirige a su ubicación para comenzar su orden.',
    'El voluntario se dirige a conseguir sus productos.',
    'El voluntario tiene en posesión sus productos y se dirige a su ubicación.',
    'La orden ha sido realizada. Muchas gracias.',
  ],
  cancelled: false,
  cancelledText: 'La orden ha sido cancelada',
  icons: [
    <Package size="large" color="black" />,
    <Task size="large" color="black" />,
    <Deliver size="large" color="black" />,
    <Home size="large" color="black" />,
  ],
};

export default Stepper;
