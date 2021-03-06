import React from 'react';
import faker from 'faker';
import {
  fireEvent, waitFor, screen,
} from '@testing-library/react';
import { MONTHS } from 'Data/utils';
import Register from 'Containers/Register';
import helpeeService from 'Api/helpee.service';
import render from '../../__mocks__/render';

// eslint-disable-next-line react/prop-types
jest.mock('Components/Utils/AddressInput', () => ({ onChange }) => (
  <input aria-label="address" name="address" onChange={(e) => onChange({ label: e.target.value })} />
));

jest.mock('Api/helpee.service', () => ({
  create: jest.fn(),
}));

describe('Register container', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('has a create user button', () => {
    render(<Register volunteer />);

    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument();
  });

  test('hitting the submit button should show errors', async () => {
    render(<Register />);

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    await waitFor(() => {
      expect(screen.getAllByText(/Requerido/i)).toHaveLength(9);
      expect(screen.getByText(/Inserte un email válido/i)).toBeInTheDocument();
    });
  });

  test('filling the form and hitting submit', async () => {
    render(<Register />);

    // random data
    const username = faker.internet.userName();
    const emailValue = faker.internet.email();
    const nameValue = faker.name.firstName(undefined);
    const lastnameValue = faker.name.lastName(undefined);
    const passwordValue = faker.internet.password();
    const repeatPasswordValue = passwordValue;
    const addressValue = faker.address.streetAddress(undefined);
    const birthDayValue = faker.random.number(30);
    const month = MONTHS[9];
    const birthYearValue = faker.random.number({ min: 1, max: 4 });
    const phoneValue = `09${faker.random.number({ min: 1000000, max: 9999999 })}`;

    // select month
    fireEvent.click(screen.getByLabelText('birthMonth'));
    fireEvent.click(screen.getByText(month.displayValue));

    // change all fields
    fireEvent.change(screen.getByLabelText('username'), { target: { value: username } });
    fireEvent.change(screen.getByLabelText('email'), { target: { value: emailValue } });
    fireEvent.change(screen.getByLabelText('name'), { target: { value: nameValue } });
    fireEvent.change(screen.getByLabelText('lastname'), { target: { value: lastnameValue } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: passwordValue } });
    fireEvent.change(screen.getByLabelText('repeatPassword'), { target: { value: repeatPasswordValue } });
    fireEvent.change(screen.getByLabelText('address'), { target: { value: addressValue } });
    fireEvent.change(screen.getByLabelText('birthDay'), { target: { value: birthDayValue } });
    fireEvent.change(screen.getByLabelText('birthYear'), { target: { value: birthYearValue } });
    fireEvent.change(screen.getByLabelText('phone_number'), { target: { value: phoneValue } });

    expect(screen.getByRole('form')).toBeInTheDocument();

    const usernameResponse = faker.internet.userName();
    helpeeService.create.mockResolvedValue({
      status: 200,
      username: usernameResponse,
    });

    // submit form
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    await waitFor(() => {
      expect(screen.getByText(
        'Su solicitud de registro se ha enviado correctamente, '
        + 'le hemos enviado un mail de confirmación a su casilla de correo.'
      )).toBeInTheDocument();
    });
  });

  test('Validates password and repeat password fields', async () => {
    render(<Register />);

    const passwordValue = faker.random.number();
    const repeatPasswordValue = passwordValue + 1;

    fireEvent.change(screen.getByLabelText('password'), { target: { value: passwordValue } });
    fireEvent.change(screen.getByLabelText('repeatPassword'), { target: { value: repeatPasswordValue } });

    expect(screen.getByRole('form')).toBeInTheDocument();

    // submit form
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    await waitFor(() => {
      expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
    });
  });

  test('Validates date fields', async () => {
    render(<Register />);
    const birthDayValue = faker.random.number({ min: 32, max: 99 });
    const month = MONTHS[9];
    const birthYearValue = faker.random.words();

    fireEvent.click(screen.getByLabelText('birthMonth'));
    fireEvent.click(screen.getByText(month.displayValue));
    fireEvent.change(screen.getByLabelText('birthDay'), { target: { value: birthDayValue } });
    fireEvent.change(screen.getByLabelText('birthYear'), { target: { value: birthYearValue } });

    expect(screen.getByRole('form')).toBeInTheDocument();

    // submit form
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    await waitFor(() => {
      expect(screen.getAllByText(/No válido/i)).toHaveLength(3);
    });
  });

  test('filling the form, hitting submit and error response', async () => {
    render(<Register />);

    // random data
    const username = faker.internet.userName();
    const emailValue = faker.internet.email();
    const nameValue = faker.name.firstName(undefined);
    const lastnameValue = faker.name.lastName(undefined);
    const passwordValue = faker.internet.password();
    const repeatPasswordValue = passwordValue;
    const addressValue = faker.address.streetAddress(undefined);
    const birthDayValue = faker.random.number(30);
    const month = MONTHS[9];
    const birthYearValue = faker.random.number({ min: 1, max: 4 });

    // select month
    fireEvent.click(screen.getByLabelText('birthMonth'));
    fireEvent.click(screen.getByText(month.displayValue));

    // change all fields
    fireEvent.change(screen.getByLabelText('username'), { target: { value: username } });
    fireEvent.change(screen.getByLabelText('email'), { target: { value: emailValue } });
    fireEvent.change(screen.getByLabelText('name'), { target: { value: nameValue } });
    fireEvent.change(screen.getByLabelText('lastname'), { target: { value: lastnameValue } });
    fireEvent.change(screen.getByLabelText('password'), { target: { value: passwordValue } });
    fireEvent.change(screen.getByLabelText('repeatPassword'), { target: { value: repeatPasswordValue } });
    fireEvent.change(screen.getByLabelText('address'), { target: { value: addressValue } });
    fireEvent.change(screen.getByLabelText('birthDay'), { target: { value: birthDayValue } });
    fireEvent.change(screen.getByLabelText('birthYear'), { target: { value: birthYearValue } });

    expect(screen.getByRole('form')).toBeInTheDocument();

    helpeeService.create.mockResolvedValue({
      status: 400,
    });

    // submit form
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    await waitFor(() => {
      expect(screen.getByText('No válido')).toBeInTheDocument();
    });
  });
});
