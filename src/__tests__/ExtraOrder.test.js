import React from 'react';
import faker from 'faker';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Orders from 'Components/OrdersList';
import logUser from 'Reducers/logUser';
import userNotifications from 'Reducers/logUser';
import { combineReducers } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import ordersService from 'Api/orders.service';

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

jest.mock('Api/orders.service', () => ({
  take: jest.fn(),
}));

describe('Extra order', () => {
  test('Take order', async () => {
    const props = {
      orders: [{
        id: faker.random.number(),
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: {
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
        },
        categories: [{
          label: 'Supermercado',
        }],
        status: 'created',
      }],
    };
    ordersService.take.mockImplementation(() => ({ status: 200 }));
    const setLoading = jest.fn();
    const { getByText } = renderWithProviders(<Orders orders={props.orders} setLoading={setLoading} modalClosed={jest.fn()} />);
    fireEvent.click(getByText(/Ver más/i));
    await fireEvent.click(getByText(/Postularse/i));
    await waitFor(() => {
      expect(ordersService.take).toHaveBeenCalledTimes(1);
    });
  });
  test('Take order', async () => {
    const props = {
      orders: [{
        id: faker.random.number(),
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: {
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
        },
        categories: [{
          label: 'Supermercado',
        }],
        status: 'created',
      }],
    };
    ordersService.take.mockImplementation(() => { throw new Error('error'); });
    const setLoading = jest.fn();
    const { getByText, getAllByText } = renderWithProviders(<Orders orders={props.orders} setLoading={setLoading} modalClosed={jest.fn()} />);
    fireEvent.click(getByText(/Ver más/i));
    await fireEvent.click(getAllByText(/Postularse/i)[1]);
    await waitFor(() => {
      expect(getByText(/Hubo un error./i)).toBeInTheDocument();
    });
  });
});
