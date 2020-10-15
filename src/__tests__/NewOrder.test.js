import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useSelector } from 'react-redux';
import CreateOrder from 'Components/Modals/CreateOrder';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Create new order', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      logUser: {
        data: { documentNumber: '232323' },
        loggedIn: false,
      },
    }));
  });

  test('Shows create button', () => {
    const { getAllByText } = render(<CreateOrder />);

    expect(getAllByText(/Crear/i)[1]).toBeInTheDocument();
  });

  test('Shows title button', async () => {
    const dom = render(<CreateOrder />);
    fireEvent.click(dom.getAllByText(/Crear/i)[1]);
    await waitFor(() => {
      expect(dom.getByText(/Título/)).toBeInTheDocument();
    });
  });

  test('Shows categories field', async () => {
    const dom = render(<CreateOrder />);
    fireEvent.click(dom.getAllByText(/Crear/i)[1]);
    await waitFor(() => {
      expect(dom.getByText(/Categorías/)).toBeInTheDocument();
    });
  });

  test('Shows description field', async () => {
    const dom = render(<CreateOrder />);
    fireEvent.click(dom.getAllByText(/Crear/i)[1]);
    await waitFor(() => {
      expect(dom.getByText(/Descripción/)).toBeInTheDocument();
    });
  });
});
