// eslint-disable jsx-props-no-spreading
import React from 'react';
import faker from 'faker';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Orders from 'Components/OrdersList';
import Order from 'Components/OrderCard';
import OrdersService from 'Api/orders.service';
import SuccessModal from 'Components/Modals/SuccessModal';
import ErrorModal from 'Components/Modals/ErrorModal';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('Api/orders.service');

describe('Success modal for application', () => {
  test('success message', () => {
    const setShow = jest.fn();
    const { getByText }= render(
      <SuccessModal message="Ha tomado la orden! Gracias por ayudar!" show setShow={setShow} />
    );
    expect(getByText(/Ha tomado/i)).toBeInTheDocument();
    fireEvent.click(document.getElementById('close-ok-modal'));
    expect(setShow).toHaveBeenCalledTimes(1);
  });
});

describe('Error modal for application', () => {
  test('Error message', () => {
    const setShow = jest.fn();
    const { getByText } = render(
      <ErrorModal show setShow={setShow} />
    );
    expect(getByText(/Lo sentimos/i)).toBeInTheDocument();
    fireEvent.click(document.getElementById('close-err-modal'));
    expect(setShow).toHaveBeenCalledTimes(1);
  });
});

describe('Orders', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      logUser: {
        data: { documentNumber: '232323' },
        loggedIn: false,
      },
    }));
  });
  const openModal = jest.fn();
  const viewportSize = jest.fn();

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
    const { getByText } = render(<Order order={props.order} viewportSize={viewportSize} openModal={openModal} />);

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
    const { getByText } = render(<Order order={props.order} viewportSize={viewportSize} openModal={openModal} />);

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
    const { getByText } = render(<Order order={props.order} viewportSize={viewportSize} openModal={openModal} />);

    expect(getByText(props.order.description)).toBeInTheDocument();
  });

  test('Open modal', () => {
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
    const { getByText } = render(<Order order={props.order} viewportSize="small" openModal={openModal} />);
    fireEvent.click(getByText(/Ver más/i));
    expect(openModal).toHaveBeenCalledTimes(1);
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
    };
    const setLoading = jest.fn();
    const { getByText } = render(<Orders orders={props.orders} setLoading={setLoading} />);

    expect(getByText(props.orders[0].description)).toBeInTheDocument();
  });

  test('Shows more', () => {
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
    const setLoading = jest.fn();
    const { getByText } = render(<Orders orders={props.orders} setLoading={setLoading} />);
    fireEvent.click(getByText(/Ver más/i));
    expect(getByText(/Categorías/i)).toBeInTheDocument();
  });

  test('Cancel view more', () => {
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
    const setLoading = jest.fn();
    const { getByText, getAllByText } = render(<Orders orders={props.orders} setLoading={setLoading} />);
    fireEvent.click(getByText(/Ver más/i));
    fireEvent.click(getAllByText(/Cancelar/i)[1]);
    expect(getAllByText(props.orders[0].description)[0]).toBeInTheDocument();
  });

  test('Finish order', async () => {
    useSelector.mockImplementation((selector) => selector({
      logUser: {
        data: {  },
        loggedIn: false,
      },
    }));
    const props = {
      orders: [{
        id: faker.random.number(),
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: faker.internet.userName(),
        categories: [{
          label: 'Supermercado',
        }],
        status: 'in_process'
      }],
    };
    OrdersService.setOrderStatus.mockResolvedValue({
      data: {
        order_id: faker.random.number()
      },
    });
    const setLoading = jest.fn();
    const { getByText, getAllByText } = render(<Orders orders={props.orders} setLoading={setLoading} />);
    fireEvent.click(getByText(/Ver más/i));
    fireEvent.click(getByText(/Finalizar/i));
    await waitFor(() => {
      expect(getByText(/Calific/i)).toBeInTheDocument();

    });
  })

  test('Take order modal', async () => {
    
    const props = {
      orders: [{
        id: faker.random.number(),
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: faker.internet.userName(),
        categories: [{
          label: 'Supermercado',
        }],
        status: 'created'
      }],
    };
    OrdersService.take.mockResolvedValue({
      data: {
        order_id: faker.random.number()
      },
    });

    const setLoading = jest.fn();
    const { getByText } = render(<Orders orders={props.orders} setLoading={setLoading} />);
    fireEvent.click(getByText(/Ver más/i));
    fireEvent.click(getByText(/Postularse/i));
    await waitFor(() => {
      expect(getByText(/Ha tomado/i)).toBeInTheDocument();
      fireEvent.click(document.getElementById('close-ok-modal'));
    });

  });
});

