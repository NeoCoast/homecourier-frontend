// eslint-disable jsx-props-no-spreading
import React from 'react';
import {
  fireEvent, render, waitFor, screen,
} from '@testing-library/react';
import { useSelector } from 'react-redux';
import VolunteerApplicationsList from 'Components/VolunteerApplicationsList';
import orderServices from 'Api/orders.service';
import faker from 'faker';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('Api/orders.service');

describe('Orders', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      logUser: {
        data: { documentNumber: '232323', name: faker.name.firstName(), lastName: faker.name.lastName() },
        loggedIn: true,
      },
    }));
  });

  test('Shows the component without applications', async () => {
    orderServices.getApplicationsList.mockResolvedValue([]);
    const dom = render(<VolunteerApplicationsList orderId="1" />);

    await waitFor(() => {
      expect(dom.getByText(/no hay postulaciones de voluntarios para tomar el pedido/i)).toBeInTheDocument();
    });
  });

  test('Shows the component with applications', async () => {
    orderServices.getApplicationsList.mockResolvedValue([
      {
        id: 1,
        username: 'zero',
        name: 'uno',
        lastname: 'dos',
      },
    ]);
    const dom = render(<VolunteerApplicationsList orderId="1" />);

    await waitFor(() => {
      expect(dom.getByText(/Lista de postulaciones/i)).toBeInTheDocument();
    });
  });

  test('The component shows the same number of applications that recive', async () => {
    orderServices.getApplicationsList.mockResolvedValue([
      {
        id: 1,
        username: 'zero',
        name: 'uno',
        lastname: 'dos',
      },
      {
        id: 2,
        username: 'zero',
        name: 'uno',
        lastname: 'dos',
      },
      {
        id: 3,
        username: 'zero',
        name: 'uno',
        lastname: 'dos',
      },
    ]);
    const dom = render(<VolunteerApplicationsList orderId="1" />);

    await waitFor(() => {
      expect(dom.getByText(/Lista de postulaciones/i)).toBeInTheDocument();
    });

    const items = await screen.findAllByText(/Aceptar/i);
    expect(items).toHaveLength(3);
  });

  test('Accepts a volunteer and show success modal', async () => {
    orderServices.getApplicationsList.mockResolvedValue([
      {
        id: 1,
        username: 'zero',
        name: 'uno',
        lastname: 'dos',
      },
      {
        id: 2,
        username: 'zero',
        name: 'uno',
        lastname: 'dos',
      },
      {
        id: 3,
        username: 'zero',
        name: 'uno',
        lastname: 'dos',
      },
    ]);
    orderServices.acceptVolunteerForOrder.mockResolvedValue({
      status: 200,
    });
    const dom = render(<VolunteerApplicationsList orderId="1" />);

    await waitFor(() => {
      expect(dom.getByText(/Lista de postulaciones/i)).toBeInTheDocument();
    });

    const arrayButtons = dom.getAllByText(/Aceptar/i)[0];

    fireEvent.click(arrayButtons);
    await waitFor(() => {
      expect(dom.getByText(/El voluntario ha sido aceptado/i)).toBeInTheDocument();
    });
  });
});
