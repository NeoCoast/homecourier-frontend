import React from 'react';
import faker from 'faker';
import { waitFor } from '@testing-library/react';
import MapOrderList from 'Components/MapOrderList';
import orderServices from 'Api/orders.service';
import MockGoogleMap from '../../__mocks__/mockGoogleMap';
import render from '../../__mocks__/render';

// const MockGoogleMap = ({
//   children,
//   onTilesLoaded,
// }) => {
//   React.useEffect(() => {
//     onTilesLoaded();
//   }, []);

//   return (
//     <div>
//       Map
//       {children}
//     </div>
//   );
// };
const initialState = {
  logUser: {
    data: { documentNumber: '232323', lattitude: 1, longitude: 1 },
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

jest.mock('react-google-maps', () => ({
  __esModule: true,
  GoogleMap: (props) => new MockGoogleMap(props),
  Circle: () => <div>Circle</div>,
  Marker: () => <div>Marker</div>,
  withGoogleMap: (Component) => Component,
  withScriptjs: (Component) => Component,
}));

jest.mock('Api/orders.service', () => ({
  getOrdersMap: jest.fn(),
}));

describe('MapOrderList', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render the map', () => {
    orderServices.getOrdersMap.mockImplementation(() => Promise.resolve([]));
    const { getByText } = render(<MapOrderList />, { initialState });
    expect(getByText(/map/i)).toBeInTheDocument();
  });

  test('should render the circles', async () => {
    const orders = [...Array(faker.random.number({ max: 5, min: 1 }))]
      .map(() => ({
        helpee: {
          latitude: faker.random.number(),
          longitude: faker.random.number(),
        },
      }));
    orderServices.getOrdersMap
      .mockImplementation(() => (
        Promise.resolve(orders)
      ));

    const { queryAllByText } = render(<MapOrderList />, { initialState });

    waitFor(() => {
      expect(orderServices.getOrdersMap)
        .toBeCalledTimes(1);
      // .toBeCalledWith(1, 2, 3, 4);
      expect(queryAllByText(/circle/i).length).toBe(orders.length);
    });
  });

  test('should render the markers', async () => {
    const orders = [...Array(faker.random.number({ max: 5, min: 1 }))]
      .map(() => ({
        helpee: {
          latitude: faker.random.number(),
          longitude: faker.random.number(),
        },
      }));
    orderServices.getOrdersMap
      .mockImplementation(() => (
        Promise.resolve(orders)
      ));

    const { queryAllByText } = render(<MapOrderList />, { initialState });

    waitFor(() => {
      expect(orderServices.getOrdersMap)
        .toBeCalledTimes(1);
      // .toBeCalledWith(1, 2, 3, 4);
      expect(queryAllByText(/marker/i).length).toBe(orders.length);
    });
  });
});
