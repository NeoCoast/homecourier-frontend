import React from 'react';
import faker from 'faker';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Login from 'Containers/Login';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

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

    expect(getByText(/Login/i)).toBeInTheDocument();
  });

  test('Shows Required Error', () => {
    const { getByText } = render(<Router><Login /></Router>);

    fireEvent.change(document.getElementById('email'), { target: { value: 'esto no es email' } });
    fireEvent.change(document.getElementById('password'), { target: { value: 'password' } });

    fireEvent.click(getByText(/Login/i));

    expect(getByText(/Inserte un email válido/i)).toBeInTheDocument();
  });

  test('Submits form', async () => {
    const dom = render(<Router><Login /></Router>);

    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    fireEvent.change(document.getElementById('email'), { target: { value: user.email } });
    fireEvent.change(document.getElementById('password'), { target: { value: user.password } });
    fireEvent.click(dom.getByText(/Login/i));
    await waitFor(() => {
      expect(dom.getByText(/Lo Sentimos! Ha ocurrido error./i)).toBeInTheDocument();
    });
  });
});
