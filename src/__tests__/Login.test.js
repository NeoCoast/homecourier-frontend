import React from 'react';
import faker from 'faker';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Login from 'Containers/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import usersService from '../api/users.service';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: jest.fn().mockImplementation(() => mockDispatch),
  useSelector: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../api/users.service');

describe('Register', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      logUser: {
        data: { documentNumber: '232323' },
        loggedIn: false,
      },
    }));
  });

  test('Has login button', () => {
    const { getByText } = render(<Router><Login /></Router>);

    expect(getByText(/Ingresar/i)).toBeInTheDocument();
  });

  test('Shows Required Error', () => {
    const { getByText } = render(<Router><Login /></Router>);

    fireEvent.change(document.getElementById('email'), { target: { value: 'esto no es email' } });
    fireEvent.change(document.getElementById('password'), { target: { value: 'password' } });

    fireEvent.click(getByText(/Ingresar/i));

    expect(getByText(/Inserte un email válido/i)).toBeInTheDocument();
  });

  test('Login success', async () => {
    const dom = render(<Router><Login history={[]} /></Router>);

    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    usersService.login.mockResolvedValue({
      headers: {
        authorization: true,
      },
      data: [],
    });
    useSelector.mockImplementation((selectorFn) => selectorFn({
      logUser: {
        data: { documentNumber: '232323' },
        loggedIn: false,
      },
    }));

    fireEvent.change(document.getElementById('email'), { target: { value: user.email } });
    fireEvent.change(document.getElementById('password'), { target: { value: user.password } });
    fireEvent.click(dom.getByText(/Login/i));
    await waitFor(() => {
      expect(dom.getByText(/Login/i)).toBeInTheDocument();
    });
  });

  test('Login fail', async () => {
    const dom = render(<Router><Login history={[]} /></Router>);

    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    usersService.login.mockImplementation(() => {
      throw new Error();
    });

    fireEvent.change(document.getElementById('email'), { target: { value: user.email } });
    fireEvent.change(document.getElementById('password'), { target: { value: user.password } });
    fireEvent.click(dom.getByText(/Ingresar/i));
    await waitFor(() => {
      expect(dom.getByText(/Lo Sentimos! Ha ocurrido error./i)).toBeInTheDocument();
    });
  });
});
