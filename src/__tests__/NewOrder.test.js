import React from 'react';
import faker from 'faker';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import CreateOrder from 'Components/Modals/CreateOrder';
import { combineReducers } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import logUser from 'Reducers/logUser';
import ordersService from 'Api/orders.service';
import categoriesService from 'Api/categories.service';

function renderWithProviders(ui, reduxState) {
  const initialState = {
    logUser: {
      data: { documentNumber: '232323' },
      loggedIn: false,
    },
  };
  const rootReducer = combineReducers({
    logUser,
  });
  const history = createBrowserHistory();
  const store = createStore(rootReducer, reduxState || initialState);
  return render(
    <Router history={history}>
      <Provider store={store}>{ui}</Provider>
    </Router>
  );
}

jest.mock('Api/orders.service', () => ({
  create: jest.fn(),
}));

jest.mock('Api/categories.service', () => ({
  getCategories: jest.fn(),
}));

describe('Create new order', () => {
  const closeModal = jest.fn();

  const state = {
    logUser: {
      data: { documentNumber: '232323' },
      loggedIn: true,
    },
  };

  test('Create order', async () => {
    const category = [];
    category.push({
      'id': 1,
      'description': faker.name.firstName(),
    });

    categoriesService.getCategories.mockResolvedValue(() => ({
      status: 200,
      data: {
        data: category,
      },
    }));

    ordersService.create.mockImplementation(() => ({
      status: 404,
    }));

    const order = {
      title: faker.random.words(),
      description: faker.random.words(),
    };

    const dom = await renderWithProviders(<CreateOrder closeModal={closeModal} />, state);
    fireEvent.change(document.getElementById('title'), { target: { value: order.title } });
    fireEvent.change(document.getElementById('description'), { target: { value: order.description } });
    fireEvent.click(dom.getByText('Seleccione una..'));
    await waitFor(() => {
      expect(screen.findAllByText(category[0].description));
    });
  });

  // test('Create order', async () => {
  //   const category = [];
  //   category.push({
  //     'id': 1,
  //     'description': faker.name.firstName(),
  //   });

  //   categoriesService.getCategories.mockResolvedValue(() => ({
  //     status: 200,
  //     data: {
  //       data: category,
  //     },
  //   }));

  //   ordersService.create.mockImplementation(() => ({
  //     status: 404,
  //   }));

  //   const order = {
  //     title: faker.random.words(),
  //     description: faker.random.words(),
  //   };

  //   const dom = await renderWithProviders(<CreateOrder closeModal={closeModal} />, state);
  //   fireEvent.change(document.getElementById('title'), { target: { value: order.title } });
  //   fireEvent.change(document.getElementById('description'), { target: { value: order.description } });
  //   fireEvent.change(dom.getByPlaceholderText(/Seleccione una../i), { target: { value: category[0].description } });
  //   fireEvent.click(dom.getByText(/Crear/i));
  //   await waitFor(() => {
  //     expect(screen.findAllByText(/Ocurrió un error intentando comunicarse con el servidor/i));
  //   });
  // });
});
