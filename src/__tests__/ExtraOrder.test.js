import React from 'react';
import faker from 'faker';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ordersService from 'Api/orders.service';
import Orders from 'Components/OrdersList';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

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
        helpee: faker.internet.userName(),
        categories: [{
          label: 'Supermercado',
        }],
      }],
    };
    ordersService.take.mockImplementation(() => ({ status: 200 }));
    const setLoading = jest.fn();
    const { getByText } = render(<Orders orders={props.orders} setLoading={setLoading} />);
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
        helpee: faker.internet.userName(),
        categories: [{
          label: 'Supermercado',
        }],
      }],
    };
    ordersService.take.mockImplementation(() => { throw new Error('error'); });
    const setLoading = jest.fn();
    const { getByText, getAllByText } = render(<Orders orders={props.orders} setLoading={setLoading} />);
    fireEvent.click(getByText(/Ver más/i));
    await fireEvent.click(getAllByText(/Postularse/i)[1]);
    await waitFor(() => {
      expect(getByText(/Hubo un error./i)).toBeInTheDocument();
    });
  });
});
