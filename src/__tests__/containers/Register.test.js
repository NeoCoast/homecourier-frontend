import React from 'react';
import faker from 'faker';
import { fireEvent, waitFor, cleanup } from '@testing-library/react';
import { MONTHS } from 'Data/utils';
import Register from 'Containers/Register';
import render from '../../__mocks__/render';
import helpeeService from '../../api/helpee.service';

jest.mock('../../api/helpee.service');

describe('Register container', () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test('has a username input', () => {
    const { getByLabelText } = render(<Register />);

    expect(getByLabelText('username')).toBeInTheDocument();
  });

  test('has a email input', () => {
    const { getByLabelText } = render(<Register />);

    expect(getByLabelText('email')).toBeInTheDocument();
  });

  test('has a name input', () => {
    const { getByLabelText } = render(<Register />);

    expect(getByLabelText('name')).toBeInTheDocument();
  });

  test('has a lastname input', () => {
    const { getByLabelText } = render(<Register />);

    expect(getByLabelText('lastname')).toBeInTheDocument();
  });

  test('has a password input', () => {
    const { getByLabelText } = render(<Register />);

    expect(getByLabelText('password')).toBeInTheDocument();
  });

  test('has a repeat password input', () => {
    const { getByLabelText } = render(<Register />);

    expect(getByLabelText('repeatPassword')).toBeInTheDocument();
  });

  test('has a address input', () => {
    const { getByLabelText } = render(<Register />);

    expect(getByLabelText('address')).toBeInTheDocument();
  });

  test('has a create user button', () => {
    const { getByRole } = render(<Register />);

    expect(getByRole('button', { name: 'Registrarse' })).toBeInTheDocument();
  });

  test('hitting the submit button should show errors', async () => {
    const {
      getByRole, getByText, getAllByText,
    } = render(<Register />);

    fireEvent.click(getByRole('button', { name: 'Registrarse' }));

    await waitFor(() => {
      expect(getAllByText(/Requerido/i)).toHaveLength(9);
      expect(getByText(/Inserte un email válido/i)).toBeInTheDocument();
    });
  });

  test('filling the form and hitting submit', async () => {
    const {
      getByText,
      getByRole,
      getByLabelText,
    } = render(<Register />);

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
    fireEvent.click(getByLabelText('birthMonth'));
    fireEvent.click(getByText(month.displayValue));

    // change all fields
    fireEvent.change(getByLabelText('username'), { target: { value: username } });
    fireEvent.change(getByLabelText('email'), { target: { value: emailValue } });
    fireEvent.change(getByLabelText('name'), { target: { value: nameValue } });
    fireEvent.change(getByLabelText('lastname'), { target: { value: lastnameValue } });
    fireEvent.change(getByLabelText('password'), { target: { value: passwordValue } });
    fireEvent.change(getByLabelText('repeatPassword'), { target: { value: repeatPasswordValue } });
    fireEvent.change(getByLabelText('address'), { target: { value: addressValue } });
    fireEvent.change(getByLabelText('birthDay'), { target: { value: birthDayValue } });
    fireEvent.change(getByLabelText('birthYear'), { target: { value: birthYearValue } });

    expect(getByRole('form')).toBeInTheDocument();

    const usernameResponse = faker.internet.userName();
    helpeeService.create.mockResolvedValue({
      status: 200,
      username: usernameResponse,
    });

    // submit form
    fireEvent.click(getByRole('button', { name: 'Registrarse' }));

    await waitFor(() => {
      // expect(getByText(`Bienvenido, ${usernameResponse}`)).toBeInTheDocument();
      expect(getByText('Su solicitud de registro se ha enviado correctamente, le hemos enviado un mail de confirmacion a su casilla de correo.')).toBeInTheDocument();
    });
  });

  test('filling the form, hitting submit and error response', async () => {
    const {
      getByText,
      getByRole,
      getByLabelText,
    } = render(<Register />);

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
    fireEvent.click(getByLabelText('birthMonth'));
    fireEvent.click(getByText(month.displayValue));

    // change all fields
    fireEvent.change(getByLabelText('username'), { target: { value: username } });
    fireEvent.change(getByLabelText('email'), { target: { value: emailValue } });
    fireEvent.change(getByLabelText('name'), { target: { value: nameValue } });
    fireEvent.change(getByLabelText('lastname'), { target: { value: lastnameValue } });
    fireEvent.change(getByLabelText('password'), { target: { value: passwordValue } });
    fireEvent.change(getByLabelText('repeatPassword'), { target: { value: repeatPasswordValue } });
    fireEvent.change(getByLabelText('address'), { target: { value: addressValue } });
    fireEvent.change(getByLabelText('birthDay'), { target: { value: birthDayValue } });
    fireEvent.change(getByLabelText('birthYear'), { target: { value: birthYearValue } });

    expect(getByRole('form')).toBeInTheDocument();

    helpeeService.create.mockResolvedValue({
      status: 400,
    });

    // submit form
    fireEvent.click(getByRole('button', { name: 'Registrarse' }));

    await waitFor(() => {
      expect(getByText('Verifique que los datos introducidos sean correctos')).toBeInTheDocument();
    });
  });

  describe('Volunteer Fields', () => {
    test('Volunteer header', () => {
      const { getByText } = render(<Register volunteer />);

      expect(getByText(/Gracias por querer ayudar/i)).toBeInTheDocument();
    });

    test('has a document number input', () => {
      const { getByLabelText } = render(<Register volunteer />);

      expect(getByLabelText('userId')).toBeInTheDocument();
    });

    test('has a document face input', () => {
      const { getByLabelText } = render(<Register volunteer />);

      expect(getByLabelText('documentFace')).toBeInTheDocument();
    });

    test('has a document back input', () => {
      const { getByLabelText } = render(<Register volunteer />);

      expect(getByLabelText('documentBack')).toBeInTheDocument();
    });
  });
});
