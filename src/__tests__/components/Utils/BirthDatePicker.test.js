import React from 'react';
import { screen } from '@testing-library/react';
import { validateDay, validateYear } from 'Helpers/validator.helper';
import BirthDatePicker from 'Components/Utils/BirthDatePicker';
import render from '../../../__mocks__/render';

describe('BirthDatePicker component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const errorMessage = '';
  const validateDayFunction = jest.fn((value) => {
    validateDay(value, errorMessage);
  });
  const validateYearFunction = jest.fn((value) => {
    validateYear(value, errorMessage);
  });
  const isMinor = jest.fn();

  test('has a birth day input', () => {
    render(
      <BirthDatePicker
        validateDay={validateDayFunction}
        validateYear={validateYearFunction}
        isMinor={isMinor}
      />
    );

    expect(screen.getByLabelText('birthDay')).toBeInTheDocument();
  });

  test('has a birth month input', () => {
    render(
      <BirthDatePicker
        validateDay={validateDayFunction}
        validateYear={validateYearFunction}
        isMinor={isMinor}
      />
    );

    expect(screen.getByLabelText('birthMonth')).toBeInTheDocument();
  });

  test('has a birth year input', () => {
    render(
      <BirthDatePicker
        validateDay={validateDayFunction}
        validateYear={validateYearFunction}
        isMinor={isMinor}
      />
    );

    expect(screen.getByLabelText('birthYear')).toBeInTheDocument();
  });
});
