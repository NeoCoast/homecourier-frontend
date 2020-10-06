// eslint-disable jsx-props-no-spreading
import React from 'react';
import faker from 'faker';
import { fireEvent, render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Orders from 'Components/OrdersList';
import Order from 'Components/OrderCard';
import ViewOrderModal from 'Components/Modals/ViewOrderModal';
import SuccessModal from 'Components/Modals/SuccessModal';

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
    expect(getByText(/Descripción/i)).toBeInTheDocument();
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

  test('Take order modal', () => {
    const props = {
      order: {
        id: faker.random.number(),
        description: faker.lorem.paragraph(),
        title: faker.random.words(),
        helpee: faker.internet.userName(),
        categories: [{
          label: 'Supermercado',
        }],
      },
    };
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const { getAllByText } = render(
      <ViewOrderModal order={props.order} onClose={onClose} onConfirm={onConfirm} />
    );
    fireEvent.click(getAllByText(/Postularse/i)[2]);
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  describe('Success modal for application', () => {
    test('ok button', () => {
      const setShow = jest.fn();
      const { getByText } = render(
        <SuccessModal message="Ha tomado la orden! Gracias por ayudar!" show setShow={setShow} />
      );
      fireEvent.click(getByText(/Ok/i));
      expect(setShow).toHaveBeenCalledTimes(1);
    });
  });
});
