import React from 'react';
import faker from 'faker';
import {
  cleanup, screen, fireEvent, waitFor,
} from '@testing-library/react';
import CreateOrder from 'Components/Modals/CreateOrder';
import categoriesServices from 'Api/categories.service';
import ordersService from 'Api/orders.service';
import render from '../../../__mocks__/render';

jest.mock('Api/categories.service');
jest.mock('Api/orders.service');
const closeModal = jest.fn();

describe('CreateOrder component', () => {
  beforeEach(() => {
    categoriesServices.getCategories.mockResolvedValue([{
      id: 1,
      description: 'Farmacia',
    }, {
      id: 2,
      description: 'Supermercado',
    }, {
      id: 3,
      description: 'Cobranza',
    }]);
  });

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test('has a title input', () => {
    render(<CreateOrder closeModal={closeModal} />, {
      initialState: {
        logUser: {
          data: { id: '1' },
          loggedIn: true,
        },
      },
    });

    expect(screen.getByLabelText('title')).toBeInTheDocument();
  });

  test('has a categories input', () => {
    render(<CreateOrder closeModal={closeModal} />, {
      initialState: {
        logUser: {
          data: { id: '1' },
          loggedIn: true,
        },
      },
    });

    // expect(screen.getByLabelText('categories')).toBeInTheDocument();
    expect(screen.getAllByLabelText('categories')[1]).toBeInTheDocument();
  });

  test('has a description input', () => {
    render(<CreateOrder closeModal={closeModal} />, {
      initialState: {
        logUser: {
          data: { id: '1' },
          loggedIn: true,
        },
      },
    });

    // expect(screen.getByLabelText('description')).toBeInTheDocument();
    expect(screen.getAllByLabelText('description')[2]).toBeInTheDocument();
  });

  test('has a create button', () => {
    render(<CreateOrder closeModal={closeModal} />, {
      initialState: {
        logUser: {
          data: { id: '1' },
          loggedIn: true,
        },
      },
    });

    // expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Crear' })[3]).toBeInTheDocument();
  });

  test('has a cancel button', () => {
    render(<CreateOrder closeModal={closeModal} />, {
      initialState: {
        logUser: {
          data: { id: '1' },
          loggedIn: true,
        },
      },
    });

    // expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Cancelar' })[4]).toBeInTheDocument();
  });

  test('filling the form and hitting submit', async () => {
    render(<CreateOrder closeModal={closeModal} />, {
      initialState: {
        logUser: {
          data: { id: '1' },
          loggedIn: true,
        },
      },
    });

    fireEvent.change(screen.getAllByLabelText('title')[5], {
      target: { value: faker.lorem.paragraph() },
    });
    fireEvent.select(screen.getAllByLabelText('categories')[5], [2]);
    fireEvent.change(screen.getAllByLabelText('description')[5], {
      target: { value: faker.lorem.paragraph() },
    });

    ordersService.create.mockResolvedValue({
      status: 200,
    });

    fireEvent.click(screen.getAllByRole('button', { name: 'Crear' })[5]);

    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: 'Crear' })[5]).toBeInTheDocument();
    });
  });

  test('hitting the submit button should show errors', async () => {
    render(<CreateOrder closeModal={closeModal} />, {
      initialState: {
        logUser: {
          data: { id: '1' },
          loggedIn: true,
        },
      },
    });

    fireEvent.click(screen.getAllByRole('button', { name: 'Crear' })[1]);

    await waitFor(() => {
      expect(screen.getByText(/Título es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/Debe seleccionar al menos una categoría/i)).toBeInTheDocument();
      expect(screen.getByText(/Descripción es obligatoria/i)).toBeInTheDocument();
    });
  });

  test('title and description length error', async () => {
    render(<CreateOrder closeModal={closeModal} />, {
      initialState: {
        logUser: {
          data: { id: '1' },
          loggedIn: true,
        },
      },
    });

    fireEvent.change(screen.getAllByLabelText('title')[1], {
      target: { value: 'text' },
    });
    fireEvent.change(screen.getAllByLabelText('description')[1], {
      target: { value: 'text' },
    });
    fireEvent.click(screen.getAllByRole('button', { name: 'Crear' })[1]);

    await waitFor(() => {
      expect(screen.getByText(/Título debe tener al menos 5 carácteres/i)).toBeInTheDocument();
      expect(screen.getByText(/Descripción debe tener al menos 5 carácteres/i)).toBeInTheDocument();
    });
  });
});
