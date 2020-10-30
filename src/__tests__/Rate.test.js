// eslint-disable jsx-props-no-spreading
import React from 'react';
import faker from 'faker';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import RateOrder from 'Containers/RateOrder';
import { combineReducers } from '@reduxjs/toolkit';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import logUser from 'Reducers/logUser';
import ratingService from 'Api/rating.service';

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

jest.mock('Api/rating.service', () => ({
  rateVolunteer: jest.fn(),
  rateHelpee: jest.fn(),
}));

describe('Rating', () => {
  const setShow = jest.fn();

  const state = {
    logUser: {
      data: { documentNumber: '232323' },
      loggedIn: true,
    },
  };

  const props = {
    orderId: 3,
    show: true,
    title: faker.random.words(),
    buttonLabel: faker.random.words(),
    onSubmit: console.log('Rated'),
    stars: faker.random.number({
      'min': 10,
      'max': 50,
    }),
    description: faker.random.words(),
    errorMessageComment: faker.random.words(),
    errorMessageRating: faker.random.words(),
    successMessage: faker.random.words(),
  };

  test('Rates Helpee', async () => {
    ratingService.rateHelpee.mockImplementation(() => ({
      status: 200,
    }));
    const dom = await renderWithProviders(<RateOrder orderId={props.orderId} stars={props.stars} show={props.show} setShow={setShow} />, state);
    const items = await screen.findAllByLabelText(/Fireball/i);
    fireEvent.click(items[props.stars - 1]);
    await waitFor(() => {
      expect(dom.findByLabelText(/StatusGoodSmall/i));
    });
    fireEvent.click(dom.getByText(/Calificar/i));
    await waitFor(() => {
      expect(screen.findAllByLabelText(/¡Éxito!/i));
    });
  });
});
