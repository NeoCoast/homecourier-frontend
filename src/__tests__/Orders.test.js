// eslint-disable jsx-props-no-spreading
import React from 'react';
import faker from 'faker';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Orders from 'Components/OrdersList';
import Order from 'Components/OrderCard';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Orders', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      logUser: {
        data: { documentNumber: '232323' },
        loggedIn: false,
      },
    }));
  });
  test('Shows the title', () => {
    const props = {
      order: {
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: faker.internet.userName(),
        categories: [{
          label: 'Supermercado',
        }],
      },
    };
    const openModal = (order) => {
      order.eq(props);
    };
    const { getByText } = render(<Order order={props.order} viewportSize={null} openModal={openModal} />);

    expect(getByText(props.order.title)).toBeInTheDocument();
  });

  test('Shows the helpee', () => {
    const props = {
      order: {
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: {
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
        },
        categories: [{
          label: 'Supermercado',
        }],
      },
    };
    const openModal = (order) => {
      order.eq(props);
    };
    const { getByText } = render(<Order order={props.order} viewportSize={null} openModal={openModal} />);

    expect(getByText(`${props.order.helpee.name} ${props.order.helpee.lastname}`)).toBeInTheDocument();
  });

  test('Shows the description', () => {
    const props = {
      order: {
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: faker.internet.userName(),
        categories: [{
          label: 'Supermercado',
        }],
      },
    };
    const openModal = (order) => {
      order.eq(props);
    };
    const { getByText } = render(<Order order={props.order} viewportSize={null} openModal={openModal} />);

    expect(getByText(props.order.description)).toBeInTheDocument();
  });

  test('Shows orders', () => {
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
      loading: false,
    };
    const setLoading = (newLoading) => {
      props.loading = newLoading;
    };
    const { getByText } = render(<Orders orders={props.orders} setLoading={setLoading} />);

    expect(getByText(props.orders[0].description)).toBeInTheDocument();
  });
});
