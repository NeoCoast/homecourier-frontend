// eslint-disable jsx-props-no-spreading
import React from 'react';
import faker from 'faker';
import { fireEvent, render } from '@testing-library/react';
import Rating from 'Components/Rating';
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

describe('Rating', () => {
  const openModal = jest.fn();

  test('Shows the title', () => {
    const props = {
      title: faker.random.words(),
      onSubmit: console.log('Rated'),
    };
    const { getByText } = render(<Rating title={props.title} />);

    expect(getByText(props.order.title)).toBeInTheDocument();
  });

  test('Shows the stars', () => {
    const props = {
      stars: faker.random.number(),
      onSubmit: console.log('Rated'),
    };
    const { getByRole } = render(<Rating stars={props.stars} />);

    expect(getByRole('Stack')).toBeInTheDocument();
  });

  test('Open modal', () => {
    const props = {
      buttonLabel: 'rate',
      onSubmit: console.log('Rated'),
    };
    const { getByText } = render(<Order order={props.order} viewportSize="small" openModal={openModal} />);
    fireEvent.click(getByText(/rate/i));
    expect(openModal).toHaveBeenCalledTimes(1);
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
    const { getByText } = render(<Rating orders={props.orders} setLoading={setLoading} />);
    fireEvent.click(getByText(/Ver más/i));
    expect(getByText(/Descripción/i)).toBeInTheDocument();
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
      // fireEvent.click(getBy(/Calificar/i));
      fireEvent.click(getByText(/Calificar/i));
      expect(setShow).toHaveBeenCalledTimes(1);
    });
  });
});
