import React from 'react';
import faker from 'faker';
import {
  fireEvent, waitFor, screen,
} from '@testing-library/react';
import Login from 'Containers/Login';
import usersService from 'Api/users.service';
import volunteersService from 'Api/volunteer.service';
import helpeesService from 'Api/helpee.service';
import render from '../../__mocks__/render';

jest.mock('Api/users.service', () => ({
  login: jest.fn(),
}));
jest.mock('Api/volunteer.service', () => ({
  info: jest.fn(),
  pendingRating: jest.fn(),
}));
jest.mock('Api/helpee.service', () => ({
  info: jest.fn(),
  pendingRating: jest.fn(),
}));

describe('Login container', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('has a email input', () => {
    render(<Login />);

    expect(screen.getByLabelText('email')).toBeInTheDocument();
  });

  test('has a password input', () => {
    render(<Login />);

    expect(screen.getByLabelText('password')).toBeInTheDocument();
  });

  test('has a login button', () => {
    render(<Login />);

    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument();
  });

  test('has a register link', () => {
    render(<Login />);

    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument();
  });

  test('has a registration link for helpees', () => {
    render(<Login />);

    expect(screen.getByText('Crea tu cuenta')).toBeInTheDocument();
    expect(screen.getByText('Crea tu cuenta').closest('a')).toBeInTheDocument();
    expect(screen.getByText('Crea tu cuenta').closest('a')).toHaveAttribute('href', '/register');
  });

  test('has a registration link for volunteers', () => {
    render(<Login />);

    expect(screen.getByText('Regístrate Aquí')).toBeInTheDocument();
    expect(screen.getByText('Regístrate Aquí').closest('a')).toBeInTheDocument();
    expect(screen.getByText('Regístrate Aquí').closest('a')).toHaveAttribute('href', '/register-volunteer');
  });

  test('hitting the submit button should show errors', async () => {
    render(<Login />);

    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    await waitFor(() => {
      expect(screen.getAllByText(/Requerido/i)).toHaveLength(2);
    });
  });

  test('hitting the submit button with invalid email', async () => {
    render(<Login />);

    const emailValue = faker.lorem.word();
    fireEvent.change(screen.getByLabelText('email'), { target: { value: emailValue } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    await waitFor(() => {
      expect(screen.getByText(/Inserte un email válido/i)).toBeInTheDocument();
      expect(screen.getByText(/Requerido/i)).toBeInTheDocument();
    });
  });

  test('hitting the submit button with invalid password', async () => {
    render(<Login />);

    const emailValue = faker.internet.email();
    const passwordValue = '123';
    fireEvent.change(screen.getByLabelText('email'), { target: { value: emailValue } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: passwordValue } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    await waitFor(() => {
      expect(screen.getByText(/Credenciales inválidas/i)).toBeInTheDocument();
    });
  });

  test('filling the form and hitting submit (helpee)', async () => {
    render(<Login />);

    helpeesService.info.mockResolvedValue({
      data: {
        id: faker.random.number({ min: 1, max: 4 }),
      },
    });
    helpeesService.pendingRating.mockResolvedValue({
      pendings: [],
    });

    usersService.login.mockResolvedValue({
      status: 200,
      headers: {
        authorization: 'Bearer 123456789',
      },
      data: {
        id: faker.random.number({ min: 1, max: 4 }),
      },
    });

    const emailValue = faker.internet.email();
    const passwordValue = faker.internet.password();
    fireEvent.change(screen.getByLabelText('email'), { target: { value: emailValue } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: passwordValue } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    await waitFor(() => {
      expect(screen.getByText(/Credenciales inválidas/i)).toBeInTheDocument();
    });
  });

  test('filling the form and hitting submit (volunteer)', async () => {
    render(<Login />);

    volunteersService.info.mockResolvedValue({
      data: {
        id: faker.random.number({ min: 1, max: 4 }),
      },
    });
    volunteersService.pendingRating.mockResolvedValue({
      pendings: [],
    });

    usersService.login.mockResolvedValue({
      status: 200,
      headers: {
        authorization: 'Bearer 123456789',
      },
      data: {
        id: faker.random.number({ min: 1, max: 4 }),
        documentNumber: faker.random.number({ min: 1, max: 8 }),
      },
    });

    const emailValue = faker.internet.email();
    const passwordValue = faker.internet.password();
    fireEvent.change(screen.getByLabelText('email'), { target: { value: emailValue } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: passwordValue } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    await waitFor(() => {
      expect(screen.getByText(/Credenciales inválidas/i)).toBeInTheDocument();
    });
  });
});
