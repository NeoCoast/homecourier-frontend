import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { validateDay, validateYear } from 'Helpers/validator.helper';
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
    render(
      <BirthDatePicker
        validateDay={validateDayFunction}
        validateYear={validateYearFunction}
      />
    );

    expect(screen.getByLabelText('birthDay')).toBeInTheDocument();
  });

  test('has a birth month input', () => {
    render(
      <BirthDatePicker
        validateDay={validateDayFunction}
        validateYear={validateYearFunction}
      />
    );

    expect(screen.getByLabelText('birthMonth')).toBeInTheDocument();
  });

  test('has a birth year input', () => {
    render(
      <BirthDatePicker
        validateDay={validateDayFunction}
        validateYear={validateYearFunction}
      />
    );

    expect(screen.getByLabelText('birthYear')).toBeInTheDocument();
  });
});
