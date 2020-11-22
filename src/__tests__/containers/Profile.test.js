import React from 'react';
import faker from 'faker';
import {
  screen, waitFor,
} from '@testing-library/react';
import Profile from 'Containers/Profile';
import { ROUTES } from 'Data/constants';
import { Route } from 'react-router-dom';
import usersService from 'Api/users.service';
import render from '../../__mocks__/renderWithRoute';

jest.mock('Api/users.service', () => ({
  profileData: jest.fn(),
  ratingsData: jest.fn(),
}));

describe('Profile component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('user is logged', async () => {
    const username = faker.internet.userName();
    const name = faker.name.firstName(undefined);
    const lastname = faker.name.lastName(undefined);
    const ordersCompleted = faker.random.number({ min: 1, max: 4 });
    const rating = faker.random.number({ min: 1, max: 4 });
    render(<Route exact path={`${ROUTES.profile}/:username?`} component={Profile} />,
      {
        initialState: {
          logUser: {
            data: {
              username, name, lastname, ordersCompleted, rating,
            },
            loggedIn: true,
          },
        },
        route: '/profile',
      });

    usersService.profileData.mockResolvedValue({
      status: 200,
      data: {
        id: faker.random.number({ min: 1, max: 4 }),
      },
    });

    usersService.ratingsData.mockResolvedValue({
      status: 200,
      data: {
        ratings: [],
      },
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Map')).toBeInTheDocument();
      expect(screen.getByLabelText('Score')).toBeInTheDocument();
      expect(screen.getByText(/Este usuario aún no tiene calificaciones/i)).toBeInTheDocument();
    });
  });

  test('user has ratings', async () => {
    const username = faker.internet.userName();
    render(<Route exact path={`${ROUTES.profile}/:username?`} component={Profile} />,
      {
        initialState: {
          logUser: {
            data: { username },
            loggedIn: true,
          },
        },
        route: '/profile',
      });

    usersService.profileData.mockResolvedValue({
      data: {
        id: faker.random.number({ min: 1, max: 4 }),
      },
    });

    usersService.ratingsData.mockResolvedValue({
      data: {
        ratings: [{
          score: faker.random.number({ min: 1, max: 5 }),
          comment: faker.random.words(),
        }],
      },
    });

    await waitFor(() => {
      expect(screen.getByText(`Perfil de ${username}`)).toBeInTheDocument();
      // expect(screen.getByLabelText('Rating')).toBeInTheDocument();
    });
  });

  test('user doesnt exist', async () => {
    const username = faker.internet.userName();
    const { history } = render(<Route exact path={`${ROUTES.profile}/:username?`} component={Profile} />,
      {
        initialState: {
          logUser: {
            data: { username: faker.internet.userName() },
            loggedIn: true,
          },
        },
        route: `/profile/${username}`,
      });

    usersService.profileData.mockRejectedValue({
      status: 400,
    });

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/404');
    });
  });

  test('fails to obtain ratings', async () => {
    const username = faker.internet.userName();
    render(<Route exact path={`${ROUTES.profile}/:username?`} component={Profile} />,
      {
        initialState: {
          logUser: {
            data: { username },
            loggedIn: true,
          },
        },
        route: '/profile',
      });

    usersService.ratingsData.mockRejectedValue({
      status: 400,
    });

    await waitFor(() => {
      expect(screen.getByText(/Lo sentimos/i)).toBeInTheDocument();
    });
  });
});
