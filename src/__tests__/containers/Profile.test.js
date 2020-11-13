import React from 'react';
import faker from 'faker';
import {
  screen, waitFor,
} from '@testing-library/react';
import Profile from 'Containers/Profile';
import usersService from 'Api/users.service';
import { ROUTES } from 'Data/constants';
import { Route } from 'react-router-dom';
import render from '../../__mocks__/renderWithRoute';

jest.mock('Api/users.service', () => ({
  profileData: jest.fn(),
}));

describe('Profile component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('user is logged', async () => {
    render(<Route exact path={`${ROUTES.profile}/:username?`} component={Profile} />,
      {
        initialState: {
          logUser: {
            loggedIn: true,
          },
          route: '/profile',
        },
      });

    await waitFor(() => {
      expect(screen.getByLabelText('Map')).toBeInTheDocument();
    });
  });

  test('User exists but is not logged', async () => {
    usersService.profileData.mockResolvedValue({
      status: 200,
    });
    const username = faker.internet.userName();
    render(<Route exact path={`${ROUTES.profile}/:username?`} component={Profile} />,
      {
        initialState: {
          logUser: {
            loggedIn: true,
          },
          route: `/profile/${username}`,
        },
      });

    await waitFor(() => {
      expect(screen.getByText(username)).toBeInTheDocument();
    });
  });

  test('User doesnt exist', async () => {
    const username = faker.internet.userName();
    usersService.profileData.mockRejectedValue({
      status: 404,
    });
    render(<Route exact path={`${ROUTES.profile}/:username?`} component={Profile} />,
      {
        initialState: {
          logUser: {
            loggedIn: true,
          },
          route: `/profile/${username}`,
        },
      });

    await waitFor(() => {
      expect(screen.getByText('Oops')).toBeInTheDocument();
    });
  });
});
