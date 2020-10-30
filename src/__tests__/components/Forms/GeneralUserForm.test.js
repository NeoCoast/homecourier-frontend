import React from 'react';
import { screen } from '@testing-library/react';
import GeneralUserForm from 'Components/Forms/GeneralUserForm';
import render from '../../../__mocks__/render';

describe('GeneralUserForm component', () => {
  const message = jest.fn();
  const errorMessage = '';

  test('has a username input', () => {
    render(<GeneralUserForm message={message} errorMessage={errorMessage} />);

    expect(screen.getByLabelText('username')).toBeInTheDocument();
  });

  test('has a email input', () => {
    render(<GeneralUserForm message={message} errorMessage={errorMessage} />);

    expect(screen.getByLabelText('email')).toBeInTheDocument();
  });

  test('has a name input', () => {
    render(<GeneralUserForm message={message} errorMessage={errorMessage} />);

    expect(screen.getByLabelText('name')).toBeInTheDocument();
  });

  test('has a lastname input', () => {
    render(<GeneralUserForm message={message} errorMessage={errorMessage} />);

    expect(screen.getByLabelText('lastname')).toBeInTheDocument();
  });

  test('has a password input', () => {
    render(<GeneralUserForm message={message} errorMessage={errorMessage} />);

    expect(screen.getByLabelText('password')).toBeInTheDocument();
  });

  test('has a repeat password input', () => {
    render(<GeneralUserForm message={message} errorMessage={errorMessage} />);

    expect(screen.getByLabelText('repeatPassword')).toBeInTheDocument();
  });

  test('has a address input', () => {
    render(<GeneralUserForm message={message} errorMessage={errorMessage} />);

    expect(screen.getByLabelText('address')).toBeInTheDocument();
  });
});
