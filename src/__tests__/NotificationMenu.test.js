import React from 'react';
import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import faker from 'faker';
import NotificationMenu from 'Components/NotificationMenu';
import logUser from 'Reducers/logUser';
import userNotifications from 'Reducers/logUser';
import { combineReducers } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import ordersService from 'Api/orders.service';

function renderWithProviders(ui, reduxState) {
  const initialState = {
    logUser: {
      data: { documentNumber: '232323' },
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

jest.mock('Api/notifications.service');

jest.mock('Api/orders.service');

describe('Notification Menu Empty', () => {
  test('Has notification button', () => {
    renderWithProviders(<NotificationMenu />);
    expect(document.getElementById('noty-stack')).toBeInTheDocument();
  });

  test('Opens Dropdown', () => {
    const { getByText } = renderWithProviders(<NotificationMenu />);
    fireEvent.click(document.getElementById('noty-stack'));
    expect(getByText('Notificaciones')).toBeInTheDocument();
  });

  test('No notifications', () => {
    const { getAllByText } = renderWithProviders(<NotificationMenu />);
    fireEvent.click(document.getElementById('noty-stack'));
    expect(getAllByText(/No hay notificaciones/i)).toHaveLength(1);
  });
});

describe('Notification Menu Only New', () => {
  const state = {
    logUser: {
      data: { documentNumber: '232323' },
      loggedIn: false,
    },
    userNotifications: {
      notifications: [
        {
          id: 1,
          title: 'Una notificacion',
          body: 'notificacion',
          status: 'not_seen',
          createdAt: faker.date.past(),
        },
      ],
    },
  };
  test('No seen notifications', () => {
    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(1500);
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1500);
    const { getAllByText } = renderWithProviders(<NotificationMenu />, state);
    fireEvent.click(document.getElementById('noty-stack'));
    expect(getAllByText(/Una notificacion/i)).toHaveLength(1);
  });

  test('New notifications', () => {
    const { getByText } = renderWithProviders(<NotificationMenu />, state);
    fireEvent.click(document.getElementById('noty-stack'));
    expect(getByText(/Una notificacion/i)).toBeInTheDocument();
  });

  test('Open and close', () => {
    const { queryByText } = renderWithProviders(<NotificationMenu />, state);
    fireEvent.click(document.getElementById('noty-stack'));
    fireEvent.keyDown(document.getElementById('noty-stack'), { key: 'Escape', keyCode: 27 });
    expect(queryByText(/Una notificacion/i)).not.toBeInTheDocument();
  });
});

describe('OnClick Notification', () => {
  const state = {
    logUser: {
      data: { documentNumber: '232323' },
      loggedIn: false,
    },
    userNotifications: {
      notifications: [
        {
          id: 1,
          title: 'Una notificacion',
          body: 'notificacion',
          status: 'not_seen',
          createdAt: faker.date.past(),
        },
      ],
    },
  };
  test('Click notification', () => {
    ordersService.getOrder.mockResolvedValue({
      data: {
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
        id: 1,
      },
      status: 200,
    });
    const { getByText } = renderWithProviders(<NotificationMenu />, state);
    fireEvent.click(document.getElementById('noty-stack'));
    fireEvent.click(getByText(/Una notificacion/i));
    waitFor(() => {
      expect(ordersService.getOrder).toHaveBeenCalled(1);
    });
  });
});
