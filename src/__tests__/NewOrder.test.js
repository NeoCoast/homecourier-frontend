import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useSelector } from 'react-redux';
import CreateOrder from 'Components/Modals/CreateOrder';

jest.mock(() => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
  closeModal: jest.fn(() => false),
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
    const { getByText } = render(<CreateOrder />);

    expect(getByText(/Crear/i)).toBeInTheDocument();
  });

  test('Shows title button', async () => {
    const dom = render(<CreateOrder />);
    expect(dom.getByText('Título')).toBeInTheDocument();
  });

  test('Shows categories field', async () => {
    const dom = render(<CreateOrder />);
    expect(dom.getByText('Categorías')).toBeInTheDocument();
  });

  test('Shows description field', async () => {
    const dom = render(<CreateOrder />);
    expect(dom.getByText('Descripción')).toBeInTheDocument();
  });

  test('Shows description error', async () => {
    const dom = render(<CreateOrder />);
    fireEvent.click(dom.getByText(/Crear/i));
    await waitFor(() => {
      expect(dom.getByText('La descripción es requerida')).toBeInTheDocument();
    });
  });
});
