// eslint-disable jsx-props-no-spreading
import React from 'react';
import faker from 'faker';
import {
  fireEvent, render, screen, waitFor, cleanup,
} from '@testing-library/react';
import RateOrder from 'Containers/RateOrder';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Rating', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      logUser: {
        data: { documentNumber: '232323', name: faker.name.firstName(), lastName: faker.name.lastName() },
        loggedIn: false,
      },
    }));
    cleanup();
  });

  const setShow = () => false;

  const props = {
    orderId: 3,
    show: true,
    title: faker.random.words(),
    buttonLabel: faker.random.words(),
    onSubmit: console.log('Rated'),
    stars: faker.random.number({
      'min': 10,
      'max': 50,
    }),
    description: faker.random.words(),
    errorMessageComment: faker.random.words(),
    errorMessageRating: faker.random.words(),
    successMessage: faker.random.words(),
  };

  test('Shows Icons', async () => {
    render(<RateOrder orderId={props.orderId} stars={props.stars} show={props.show} setShow={setShow} />);
    const items = await screen.findAllByLabelText(/Fireball/i);
    expect(items).toHaveLength(props.stars);
  });

  test('Rates user', async () => {
    const { getByText } = render(<RateOrder orderId={props.orderId} buttonLabel={props.buttonLabel} show={props.show} setShow={setShow} />);

    fireEvent.click(getByText(props.buttonLabel));
    await waitFor(() => {
      expect(getByText(/Lo Sentimos! Ha ocurrido error./i)).toBeInTheDocument();
    });
  });

  // test('Changes placeholder', async () => {
  //   const { getByPlaceholderText } = render(<RateOrder orderId={props.orderId} description={props.description} show={props.show} setShow={setShow} />);
  //   expect(getByPlaceholderText(props.description)).toBeInTheDocument();
  // });

  // test('Clicks on Star', async () => {
  //   const dom = render(<RateOrder orderId={props.orderId} stars={props.stars} show={props.show} setShow={setShow} />);
  //   const items = await screen.findAllByLabelText(/Fireball/i);
  //   fireEvent.click(items[props.stars - 1]);
  //   await waitFor(() => {
  //     expect(dom.findByLabelText(/StatusGoodSmall/i));
  //   });
  // });

  // test('Recognizes volunteer', async () => {
  //   const { getAllByText } = render(<RateOrder orderId={props.orderId} show={props.show} setShow={setShow} />);
  //   expect(getAllByText(/Califique al usuario/i));
  // });

  // test('Submits with no rating', async () => {
  //   const dom = render(<RateOrder orderId={props.orderId} buttonLabel={props.buttonLabel} stars={props.stars} show={props.show} setShow={setShow} />);
  //   fireEvent.click(dom.getByText(props.buttonLabel));
  //   await waitFor(() => {
  //     expect(dom.getByText(/Lo Sentimos! Ha ocurrido error./i)).toBeInTheDocument();
  //   });
  // });
});
