import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import faker from 'faker';
import NotificationMenu from 'Components/NotificationMenu';
import notificationsService from 'Api/notifications.service';
import logUser from 'Reducers/logUser';
import userNotifications from 'Reducers/logUser';
import { combineReducers } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import { DateTime } from 'luxon';

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

jest.mock('Api/notifications.service', () => ({
  setSeenNotifications: jest.fn(),
  getNotifications: jest.fn(),
}));

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
    expect(getAllByText(/No hay notificaciones/i)).toHaveLength(2);
  });
});
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
describe('Notification Menu Only New', () => {
  test('No seen notifications', () => {
    const { getAllByText } = renderWithProviders(<NotificationMenu />, state);
    fireEvent.click(document.getElementById('noty-stack'));
    expect(getAllByText(/No hay notificaciones/i)).toHaveLength(1);
  });

  test('New notifications', () => {
    const { getByText } = renderWithProviders(<NotificationMenu />, state);
    fireEvent.click(document.getElementById('noty-stack'));
    expect(getByText(/Una notificacion/i)).toBeInTheDocument();
  });

  test('View History', async () => {
    notificationsService.getNotifications.mockImplementation(() => ({
      status: 200,
      data: {
        notifications: [
          {
            id: 2,
            title: 'Historia',
            body: 'notificacion',
            status: 'seen',
            createdAt: DateTime.local().minus({ day: 1 }).toISO(),
          },
        ],
      },
    }));
    const { getByText } = await renderWithProviders(<NotificationMenu />, state);
    fireEvent.click(document.getElementById('noty-stack'));
    fireEvent.click(getByText(/Ver todas/i));
    await waitFor(() => {
      expect(getByText(/Historia/i)).toBeInTheDocument();
    });
  });

  test('View History And Close', async () => {
    notificationsService.getNotifications.mockImplementation(() => ({
      status: 200,
      data: {
        notifications: [
          {
            id: 2,
            title: 'Historia',
            body: 'notificacion',
            status: 'seen',
            createdAt: DateTime.local().toISO(),
          },
        ],
      },
    }));
    const { getByText, queryByText } = await renderWithProviders(<NotificationMenu />, state);
    fireEvent.click(document.getElementById('noty-stack'));
    fireEvent.click(getByText(/Ver todas/i));
    await waitFor(() => {
      expect(getByText(/Historia/i)).toBeInTheDocument();
    });
    fireEvent.click(getByText(/Esconder/i));
    await waitFor(() => {
      expect(queryByText(/Historia/i)).toBeNull();
    });
  });

  test('Open And Close', async () => {
    notificationsService.getNotifications.mockImplementation(() => ({
      status: 200,
      data: {
        notifications: [
          {
            id: 2,
            title: 'Historia',
            body: 'notificacion',
            status: 'seen',
            createdAt: DateTime.local().toISO(),
          },
        ],
      },
    }));
    const { getByText, queryByText } = await renderWithProviders(<NotificationMenu />, state);
    fireEvent.click(document.getElementById('noty-stack'));
    fireEvent.click(getByText(/Ver todas/i));
    fireEvent.keyDown(document.getElementById('noty-stack'), { key: 'Escape', keyCode: 27 });
    await waitFor(() => {
      expect(queryByText(/Notificaciones/i)).toBeNull();
    });
  });

  test('Open, Close And Again', async () => {
    notificationsService.setSeenNotifications.mockImplementation(() => ({
      status: 200,
    }));
    const { getAllByText, queryByText } = await renderWithProviders(<NotificationMenu />, state);
    fireEvent.click(document.getElementById('noty-stack'));
    fireEvent.keyDown(document.getElementById('noty-stack'), { key: 'Escape', keyCode: 27 });
    await waitFor(() => {
      expect(queryByText(/Notificaciones/i)).toBeNull();
    });
    fireEvent.click(document.getElementById('noty-stack'));
    await waitFor(() => {
      expect(getAllByText(/Notificaciones/i).length).toBeGreaterThan(0);
    });
  });
});
