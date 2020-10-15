// eslint-disable jsx-props-no-spreading
import React from 'react';
import faker from 'faker';
import { render } from '@testing-library/react';
import Stepper from 'Components/Utils/Stepper';

describe('Stepper', () => {
  const props = {
    stepsContent:
    [faker.random.words(),
      faker.random.words(),
      faker.random.words(),
      faker.random.words(),
    ],
  };

  test('Shows step Content 1', () => {
    const { getByText } = render(<Stepper activeStep={1} stepsContent={props.stepsContent} />);

    expect(getByText(props.stepsContent[0])).toBeInTheDocument();
  });

  test('Shows step Content 2', () => {
    const { getByText } = render(<Stepper activeStep={2} stepsContent={props.stepsContent} />);

    expect(getByText(props.stepsContent[1])).toBeInTheDocument();
  });

  test('Shows step Content 3', () => {
    const { getByText } = render(<Stepper activeStep={3} stepsContent={props.stepsContent} />);

    expect(getByText(props.stepsContent[2])).toBeInTheDocument();
  });

  test('Shows step Content 4', () => {
    const { getByText } = render(<Stepper activeStep={4} stepsContent={props.stepsContent} />);

    expect(getByText(props.stepsContent[3])).toBeInTheDocument();
  });
});
