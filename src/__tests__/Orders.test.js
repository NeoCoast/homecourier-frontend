// eslint-disable jsx-props-no-spreading
import React from 'react';
import faker from 'faker';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Orders from 'Components/OrdersList';
import Order from 'Components/OrderCard';
import OrdersService from 'Api/orders.service';
import SuccessModal from 'Components/Modals/SuccessModal';
import ErrorModal from 'Components/Modals/ErrorModal';
import logUser from 'Reducers/logUser';
import userNotifications from 'Reducers/logUser';
import { combineReducers } from '@reduxjs/toolkit';
import { createStore } from 'redux';

jest.mock('Api/orders.service');

function renderWithProviders(ui, reduxState) {
  const initialState = {
    logUser: {
      data: { id: 1, documentNumber: '232323' },
      loggedIn: false,
    },
    userNotifications: {
      notifications: [],
    },
  };
  const rootReducer = combineReducers({
    logUser,
    userNotifications,
  });
  const store = createStore(rootReducer, reduxState || initialState);
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('Success modal for application', () => {
  test('success message', () => {
    const setShow = jest.fn();
    const { getByText } = render(
      <SuccessModal message="Ha tomado la orden! Gracias por ayudar!" show setShow={setShow} />
    );
    expect(getByText(/Ha tomado/i)).toBeInTheDocument();
    fireEvent.click(document.getElementById('close-ok-modal'));
    expect(setShow).toHaveBeenCalledTimes(1);
  });
});

describe('Error modal for application', () => {
  test('Error message', () => {
    const setShow = jest.fn();
    const { getByText } = render(
      <ErrorModal show setShow={setShow} />
    );
    expect(getByText(/Lo sentimos/i)).toBeInTheDocument();
    fireEvent.click(document.getElementById('close-err-modal'));
    expect(setShow).toHaveBeenCalledTimes(1);
  });
});

describe('Orders', () => {
  const openModal = jest.fn();
  const viewportSize = jest.fn();

  test('Shows the title', () => {
    const props = {
      order: {
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: {
          id: 33,
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
        },
        categories: [{
          label: 'Supermercado',
        }],
      },
    };
    const { getByText } = renderWithProviders(<Order order={props.order} viewportSize={viewportSize} openModal={openModal} />);

    expect(getByText(props.order.title)).toBeInTheDocument();
  });

  test('Shows the helpee', () => {
    const props = {
      order: {
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: {
          id: 33,
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
        },
        categories: [{
          label: 'Supermercado',
        }],
      },
    };
    const { getByText } = renderWithProviders(<Order order={props.order} viewportSize={viewportSize} openModal={openModal} />);

    expect(getByText(`${props.order.helpee.name.toUpperCase()} ${props.order.helpee.lastname.toUpperCase()}`)).toBeInTheDocument();
  });

  test('Shows the description', () => {
    const props = {
      order: {
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: {
          id: 33,
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
        },
        categories: [{
          label: 'Supermercado',
        }],
      },
    };
    const { getByText } = renderWithProviders(<Order order={props.order} viewportSize={viewportSize} openModal={openModal} />);

    expect(getByText(props.order.description)).toBeInTheDocument();
  });

  test('Open modal', () => {
    const props = {
      order: {
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: {
          id: 33,
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
        },
        categories: [{
          label: 'Supermercado',
        }],
        status: 'created',
      },
    };
    const { getByText } = renderWithProviders(<Order order={props.order} viewportSize="small" openModal={openModal} />);
    fireEvent.click(getByText(/Ver más/i));
    expect(openModal).toHaveBeenCalledTimes(1);
  });

  test('Shows orders', () => {
    const props = {
      orders: [{
        id: faker.random.number(),
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: {
          id: 33,
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
        },
        categories: [{
          label: 'Supermercado',
        }],
      }],
    };
    const setLoading = jest.fn();
    const { getByText } = renderWithProviders(<Orders orders={props.orders} setLoading={setLoading} />);

    expect(getByText(props.orders[0].description)).toBeInTheDocument();
  });

  test('Shows more', () => {
    const props = {
      orders: [{
        id: faker.random.number(),
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: {
          id: 33,
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
        },
        categories: [{
          label: 'Supermercado',
        }],
      }],
    };
    const setLoading = jest.fn();
    const { getByText } = renderWithProviders(<Orders orders={props.orders} setLoading={setLoading} />);
    fireEvent.click(getByText(/Ver más/i));
    expect(getByText(/Categorías/i)).toBeInTheDocument();
  });

  test('Cancel view more', () => {
    const props = {
      orders: [{
        id: faker.random.number(),
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: {
          id: 33,
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
        },
        categories: [{
          label: 'Supermercado',
        }],
      }],
    };
    const setLoading = jest.fn();
    const { getByText, getAllByText } = renderWithProviders(<Orders orders={props.orders} setLoading={setLoading} modalClosed={jest.fn()} />);
    fireEvent.click(getByText(/Ver más/i));
    fireEvent.click(getAllByText(/Cancelar/i)[1]);
    expect(getAllByText(props.orders[0].description)[0]).toBeInTheDocument();
  });

  test('Finish order', async () => {
    const props = {
      orders: [{
        id: faker.random.number(),
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: {
          id: 33,
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
        },
        categories: [{
          label: 'Supermercado',
        }],
        volunteers: [{ id: 1, name: faker.name.firstName(), lastname: faker.name.lastName() }],
        status: 'in_process',
      }],
    };

    OrdersService.setOrderStatus.mockResolvedValue({
      data: {
        order_id: faker.random.number(),
        volunteers: [{ id: 1, name: faker.name.firstName(), lastname: faker.name.lastName() }],
      },
    });
    const setLoading = jest.fn();
    const { getByText } = renderWithProviders(<Orders orders={props.orders} setLoading={setLoading} modalClosed={jest.fn()} />, {
      logUser: {
        data: { id: 2, name: faker.name.firstName(), lastname: faker.name.lastName() },
        loggedIn: false,
      },
      userNotifications: {
        notifications: [],
      },
    });
    fireEvent.click(getByText(/Ver más/i));
    fireEvent.click(getByText(/Finalizar/i));
    await waitFor(() => {
      expect(getByText(/Calific/i)).toBeInTheDocument();
    });
  });

  test('Take order modal', async () => {
    const props = {
      orders: [{
        id: faker.random.number(),
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: {
          id: 33,
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
        },
        categories: [{
          label: 'Supermercado',
        }],
        status: 'created',
      }],
    };
    OrdersService.take.mockResolvedValue({
      data: {
        order_id: faker.random.number(),
      },
    });
    OrdersService.getOrders.mockResolvedValue({
      data: props.orders,
    });

    const setLoading = jest.fn();
    const setViewOrderModal = jest.fn();
    const { getByText } = renderWithProviders(<Orders orders={props.orders} setLoading={setLoading} modalClosed={setViewOrderModal} />);
    fireEvent.click(getByText(/Ver más/i));
    fireEvent.click(getByText(/Postularse/i));
    await waitFor(() => {
      expect(getByText(/Se ha postulado/i)).toBeInTheDocument();
      fireEvent.click(document.getElementById('close-ok-modal'));
    });
  });
});
