import React from 'react';
import faker from 'faker';
import {
  screen, fireEvent, waitFor,
} from '@testing-library/react';
import CreateOrder from 'Components/Modals/CreateOrder';
import categoriesServices from 'Api/categories.service';
import ordersService from 'Api/orders.service';
import render from '../../../__mocks__/render';

jest.mock('Api/categories.service', () => ({
  getCategories: jest.fn(),
}));
jest.mock('Api/orders.service', () => ({
  create: jest.fn(),
}));
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
  });

  test('has a title input', async () => {
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

  test('has a categories input', async () => {
    render(<CreateOrder closeModal={closeModal} />, {
      initialState: {
        logUser: {
          data: { id: '1' },
          loggedIn: true,
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByLabelText('categories')).toBeInTheDocument();
    });
  });

  test('has a description input', async () => {
    render(<CreateOrder closeModal={closeModal} />, {
      initialState: {
        logUser: {
          data: { id: '1' },
          loggedIn: true,
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByLabelText('description')).toBeInTheDocument();
    });
  });

  test('has a create button', async () => {
    render(<CreateOrder closeModal={closeModal} />, {
      initialState: {
        logUser: {
          data: { id: '1' },
          loggedIn: true,
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument();
    });
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

    await waitFor(() => {
      expect(screen.getByLabelText('title')).toBeInTheDocument();
      expect(screen.getByLabelText('categories')).toBeInTheDocument();
      expect(screen.getByLabelText('description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('title'), {
      target: { value: faker.lorem.paragraph() },
    });
    fireEvent.mouseDown(screen.getByLabelText('categories'));
    fireEvent.click(screen.getByText('Farmacia'));
    fireEvent.mouseDown(screen.getByLabelText('categories'));
    fireEvent.click(screen.getByText('Supermercado'));
    fireEvent.mouseDown(screen.getByLabelText('categories'));
    fireEvent.click(screen.getByText('Cobranza'));
    fireEvent.mouseDown(screen.getByLabelText('categories'));

    fireEvent.change(screen.getByLabelText('description'), {
      target: { value: faker.lorem.paragraph() },
    });

    ordersService.create.mockResolvedValue({
      status: 200,
    });

    fireEvent.click(screen.getByRole('button', { name: 'Crear' }));

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });

  describe('invalid data check', () => {
    test('hitting the submit button should show errors', async () => {
      render(<CreateOrder closeModal={closeModal} />, {
        initialState: {
          logUser: {
            data: { id: '1' },
            loggedIn: true,
          },
        },
      });

      await waitFor(() => {
        expect(screen.getByLabelText('title')).toBeInTheDocument();
        expect(screen.getByLabelText('categories')).toBeInTheDocument();
        expect(screen.getByLabelText('description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: 'Crear' }));

      await waitFor(() => {
        expect(screen.getByText(/El título es requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Debe seleccionar al menos una categoría/i)).toBeInTheDocument();
        expect(screen.getByText(/La descripción es requerida/i)).toBeInTheDocument();
      });
    });

    test('title not empty', async () => {
      render(<CreateOrder closeModal={closeModal} />, {
        initialState: {
          logUser: {
            data: { id: '1' },
            loggedIn: true,
          },
        },
      });

      await waitFor(() => {
        expect(screen.getByLabelText('title')).toBeInTheDocument();
        expect(screen.getByLabelText('categories')).toBeInTheDocument();
        expect(screen.getByLabelText('description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText('title'), {
        target: { value: faker.lorem.paragraph() },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Crear' }));

      await waitFor(() => {
        expect(screen.getByText(/Debe seleccionar al menos una categoría/i)).toBeInTheDocument();
        expect(screen.getByText(/La descripción es requerida/i)).toBeInTheDocument();
      });
    });

    test('title not empty && categories not empty', async () => {
      render(<CreateOrder closeModal={closeModal} />, {
        initialState: {
          logUser: {
            data: { id: '1' },
            loggedIn: true,
          },
        },
      });

      await waitFor(() => {
        expect(screen.getByLabelText('title')).toBeInTheDocument();
        expect(screen.getByLabelText('categories')).toBeInTheDocument();
        expect(screen.getByLabelText('description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText('title'), {
        target: { value: faker.lorem.paragraph() },
      });
      fireEvent.mouseDown(screen.getByLabelText('categories'));
      fireEvent.click(screen.getByText(/Cobranza/i));
      fireEvent.click(screen.getByRole('button', { name: 'Crear' }));

      await waitFor(() => {
        expect(screen.getByText(/La descripción es requerida/i)).toBeInTheDocument();
      });
    });

    test('filling the form and len(title) < 5', async () => {
      render(<CreateOrder closeModal={closeModal} />, {
        initialState: {
          logUser: {
            data: { id: '1' },
            loggedIn: true,
          },
        },
      });

      await waitFor(() => {
        expect(screen.getByLabelText('title')).toBeInTheDocument();
        expect(screen.getByLabelText('categories')).toBeInTheDocument();
        expect(screen.getByLabelText('description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText('title'), {
        target: { value: 'text' },
      });
      fireEvent.mouseDown(screen.getByLabelText('categories'));
      fireEvent.click(screen.getByText(/Supermercado/i));

      fireEvent.change(screen.getByLabelText('description'), {
        target: { value: 'text' },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Crear' }));

      await waitFor(() => {
        expect(screen.getByText(/Titulo debe tener al menos 5 caracteres/i)).toBeInTheDocument();
        expect(screen.getByText(/La descripción debe tener al menos 5 caracteres/i)).toBeInTheDocument();
      });
    });

    test('filling the form and len(description) < 5', async () => {
      render(<CreateOrder closeModal={closeModal} />, {
        initialState: {
          logUser: {
            data: { id: '1' },
            loggedIn: true,
          },
        },
      });

      await waitFor(() => {
        expect(screen.getByLabelText('title')).toBeInTheDocument();
        expect(screen.getByLabelText('categories')).toBeInTheDocument();
        expect(screen.getByLabelText('description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText('title'), {
        target: { value: faker.lorem.paragraph() },
      });
      fireEvent.mouseDown(screen.getByLabelText('categories'));
      fireEvent.click(screen.getByText(/Supermercado/i));

      fireEvent.change(screen.getByLabelText('description'), {
        target: { value: 'text' },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Crear' }));

      await waitFor(() => {
        expect(screen.getByText(/La descripción debe tener al menos 5 caracteres/i)).toBeInTheDocument();
      });
    });
  });

  describe('API call reject', () => {
    test('Create order', async () => {
      render(<CreateOrder closeModal={closeModal} />, {
        initialState: {
          logUser: {
            data: { id: '1' },
            loggedIn: true,
          },
        },
      });

      await waitFor(() => {
        expect(screen.getByLabelText('title')).toBeInTheDocument();
        expect(screen.getByLabelText('categories')).toBeInTheDocument();
        expect(screen.getByLabelText('description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText('title'), {
        target: { value: faker.lorem.paragraph() },
      });
      fireEvent.mouseDown(screen.getByLabelText('categories'));
      fireEvent.click(screen.getByText(/Supermercado/i));

      fireEvent.change(screen.getByLabelText('description'), {
        target: { value: faker.lorem.paragraph() },
      });

      ordersService.create.mockRejectedValue({
        status: 500,
      });

      fireEvent.click(screen.getByRole('button', { name: 'Crear' }));

      await waitFor(() => {
        expect(screen.getByText(/Ocurrió un error intentando comunicarse con el servidor/i));
      });
    });

    test('getCategories', async () => {
      categoriesServices.getCategories.mockRejectedValue({
        status: 500,
      });
      render(<CreateOrder closeModal={closeModal} />, {
        initialState: {
          logUser: {
            data: { id: '1' },
            loggedIn: true,
          },
        },
      });

      await waitFor(() => {
        expect(screen.getByLabelText('title')).toBeInTheDocument();
        expect(screen.getByLabelText('categories')).toBeInTheDocument();
        expect(screen.getByLabelText('description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText(/Ha ocurrido un error intentando comunicarse con el servidor/i));
      });
    });
  });
});
