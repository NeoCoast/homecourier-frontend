import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import faker from 'faker';
import NotificationMenu from 'Components/NotificationMenu';
import logUser from 'Reducers/logUser';
import userNotifications from 'Reducers/logUser';
import { combineReducers } from '@reduxjs/toolkit';
import { createStore } from 'redux';

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
