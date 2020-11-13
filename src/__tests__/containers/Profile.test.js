import React from 'react';
import faker from 'faker';
import {
  screen, waitFor,
} from '@testing-library/react';
import Profile from 'Containers/Profile';
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
            data: { username: faker.internet.userName() },
            loggedIn: true,
          },
        },
        route: '/profile',
      });

    await waitFor(() => {
      expect(screen.getByLabelText('Map')).toBeInTheDocument();
    });
  });
});
