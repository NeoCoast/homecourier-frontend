import React from 'react';
import faker from 'faker';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from 'Containers/Login';
import store from 'Store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';

describe('Register', () => {
  test('Has email field', () => {
    const { getByText } = render(<Provider store={store}><BrowserRouter><Router><Login /></Router></BrowserRouter></Provider>);

    expect(getByText('Email')).toBeInTheDocument();
  });

  test('Shows Required Error', () => {
    const { getByText } = render(<Provider store={store}><BrowserRouter><Router><Login /></Router></BrowserRouter></Provider>);

    fireEvent.change(document.getElementById('email'), { target: { value: 'esto no es email' } });
    fireEvent.change(document.getElementById('password'), { target: { value: 'password' } });

    fireEvent.click(getByText(/Registrarse/i));
    fireEvent.click(getByText(/Login/i));

    expect(getByText(/Inserte un email válido/i)).toBeInTheDocument();
  });

  test('Submits form', async () => {
    const dom = render(<Provider store={store}><BrowserRouter><Router><Login /></Router></BrowserRouter></Provider>);

    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    fireEvent.change(document.getElementById('email'), { target: { value: user.email } });
    fireEvent.change(document.getElementById('password'), { target: { value: user.password } });
    await waitFor(() => {
      expect(dom.getByText(/Lo Sentimos! Ha ocurrido error./i)).toBeInTheDocument();
    });
  });
});
