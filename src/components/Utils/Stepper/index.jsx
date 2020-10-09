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
// The stepper has no actual container nor background, it is meant to be used
// inside a card, modal, etc.

const Stepper = (props) => {
  const { steps } = props;
  const { activeStep } = props;
  const { stepsLabel } = props;
  const { stepsContent } = props;
  const { cancelled } = props;
  const { cancelledText } = props;
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
              <Box direction="row" gap="xlarge">
                <Box margin="small">
                  <Stack id="1">
                    <StatusCriticalSmall size="large" color="accent-2" />
                    <StatusCritical size="large" color="black" />
                  </Stack>
                </Box>
                <Box margin="small">
                  <Stack id="2">
                    <StatusCriticalSmall size="large" color="accent-2" />
                    <StatusCritical size="large" color="black" />
                  </Stack>
                </Box>
                <Box margin="small">
                  <Stack id="3">
                    <StatusCriticalSmall size="large" color="accent-2" />
                    <StatusCritical size="large" color="black" />
                  </Stack>
                </Box>
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
              connection(String(activeStep), '4', { color: 'light-5' }),
            ]}
          />
          <Box align="center">
            <Box direction="row" gap="xlarge">
              {steps.map((value, index) => (
                <Box align="center" key={value}>
                  {steps.indexOf(String(activeStep)) >= index
                   && (
                     <Stack id={String(value)}>
                       <StatusGoodSmall size="large" color="#b3ddb4" />
                       <StatusGood size="large" color="black" />
                     </Stack>
                   )}
                  {steps.indexOf(String(activeStep)) < index
                   && (
                     <Stack id={String(value)}>
                       <StatusGoodSmall size="large" color="light-3" />
                       <StatusGood size="large" color="light-3" />
                     </Stack>
                   )}
                  <Box>
                    {value === '1'
                    && (
                      <Box align="center">
                        <Package size="large" color="black" />
                        <Text textAlign="center" margin="small">{stepsLabel[index]}</Text>
                      </Box>
                    )}
                    {value === '2'
                    && (
                      <Box align="center">
                        <Task size="large" color="black" />
                        <Text textAlign="center" margin="small">{stepsLabel[index]}</Text>
                      </Box>
                    )}
                    {value === '3'
                    && (
                      <Box align="center">
                        <Deliver size="large" color="black" />
                        <Text textAlign="center" margin="small">{stepsLabel[index]}</Text>
                      </Box>
                    )}
                    {value === '4'
                    && (
                      <Box align="center">
                        <Home size="large" color="black" />
                        <Text textAlign="center" margin="small">{stepsLabel[index]}</Text>
                      </Box>
                    )}
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
  steps: PropTypes.array,
  activeStep: PropTypes.number.isRequired,
  stepsLabel: PropTypes.array,
  stepsContent: PropTypes.array,
  cancelled: PropTypes.bool,
  cancelledText: PropTypes.string,
};

Stepper.defaultProps = {
  steps: ['1', '2', '3', '4'],
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
};

export default Stepper;
