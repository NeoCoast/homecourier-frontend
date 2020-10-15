import React from 'react';
import { cleanup } from '@testing-library/react';
import {
  validateDay,
  validateYear,
} from 'Helpers/validator.helper';
import BirthDatePicker from 'Components/Utils/BirthDatePicker';
import render from '../../../__mocks__/render';

describe('BirthDatePicker component', () => {
  afterEach(() => {
    cleanup();
  });

  const errorMessage = '';
  const validateDayFunction = (value) => {
    validateDay(value, errorMessage);
  };
  const validateYearFunction = (value) => {
    validateYear(value, errorMessage);
  };

  test('has a birth day input', () => {
    const { getByLabelText } = render(
      <BirthDatePicker
        validateDay={validateDayFunction}
        validateYear={validateYearFunction}
      />
    );

    expect(getByLabelText('birthDay')).toBeInTheDocument();
  });

  test('has a birth month input', () => {
    const { getByLabelText } = render(
      <BirthDatePicker
        validateDay={validateDayFunction}
        validateYear={validateYearFunction}
      />
    );

    expect(getByLabelText('birthMonth')).toBeInTheDocument();
  });

  // test('birthMonth select has the list of months', () => {
  //   const { getByLabelText, getByText, debug } = render(
  //     <BirthDatePicker
  //       validateDay={validateDayFunction}
  //       validateYear={validateYearFunction}
  //     />
  //   );
  //
  //   debug();
  //   debug(getByLabelText('birthMonth'));
  //   fireEvent.click(getByLabelText('birthMonth'));
  //   // debug(getByRole('select', { name: 'birthMonth' }));
  //   // fireEvent.click(getByRole('select', { name: 'birthMonth' }));
  //
  //   MONTHS.forEach(({ displayValue }) => {
  //     expect(getByText(displayValue)).toBeInTheDocument();
  //   });
  // });

  test('has a birth year input', () => {
    const { getByLabelText } = render(
      <BirthDatePicker
        validateDay={validateDayFunction}
        validateYear={validateYearFunction}
      />
    );

    expect(getByLabelText('birthYear')).toBeInTheDocument();
  });
});
