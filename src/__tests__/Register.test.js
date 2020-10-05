import React from 'react';
import faker from 'faker';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Register from 'Containers/Register';

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
  test('Has email field', () => {
    const { getByText } = render(<Register />);

    expect(getByText('Email')).toBeInTheDocument();
  });

  test('Has profile pic', () => {
    const { getByText } = render(<Register />);

    expect(getByText('Sube tu foto de perfil')).toBeInTheDocument();
  });

  test('Shows Required Error', () => {
    const { getByPlaceholderText, getByText, getAllByText } = render(<Register />);
    fireEvent.change(getByPlaceholderText(/Dia/i), { target: { value: 1 } });
    fireEvent.change(getByPlaceholderText(/Año/i), { target: { value: 1 } });

    fireEvent.click(getByText(/Registrarse/i));

    expect(getAllByText(/El Campo es Obligatorio/i)).toHaveLength(6);
    expect(getByText(/Inserte un email válido/i)).toBeInTheDocument();
  });

  test('Submits form', async () => {
    const dom = render(<Register />);

    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      name: faker.name.firstName(),
      lastname: faker.name.lastName(),
      password: faker.internet.password(),
      address: faker.address.streetName(),
      birthDay: faker.random.number(30) + 1,
      birthYear: faker.random.number(2020),
    };

    fireEvent.change(document.getElementById('username'), { target: { value: user.username } });
    fireEvent.change(document.getElementById('email'), { target: { value: user.email } });
    fireEvent.change(document.getElementById('name'), { target: { value: user.name } });
    fireEvent.change(document.getElementById('lastname'), { target: { value: user.lastname } });
    fireEvent.change(document.getElementById('password'), { target: { value: user.password } });
    fireEvent.change(document.getElementById('repeatPassword'), { target: { value: user.password } });
    fireEvent.change(document.getElementById('address'), { target: { value: user.address } });
    fireEvent.change(dom.getByPlaceholderText(/Dia/i), { target: { value: user.birthDay } });
    fireEvent.change(dom.getByPlaceholderText(/Año/i), { target: { value: user.birthYear } });
    fireEvent.click(dom.getByPlaceholderText(/Mes/i));
    fireEvent.click(dom.getByText(/Enero/i));
    fireEvent.click(dom.getByText(/Registrarse/i));
    await waitFor(() => {
      expect(dom.getByText(/Lo Sentimos! Ha ocurrido error./i)).toBeInTheDocument();
    });
  });

  test('Volunteer Fields', () => {
    const { getByText } = render(<Register volunteer />);

    expect(getByText(/Gracias por querer ayudar/i)).toBeInTheDocument();
    expect(getByText(/Número de documento/i)).toBeInTheDocument();
    expect(getByText(/Frente del Documento/i)).toBeInTheDocument();
    expect(getByText(/Dorso del Documento/i)).toBeInTheDocument();
  });

  test('Volunteer Document', () => {
    const { getByText } = render(<Register volunteer />);

    expect(getByText(/Frente del Documento/i)).toBeInTheDocument();
  });
});
