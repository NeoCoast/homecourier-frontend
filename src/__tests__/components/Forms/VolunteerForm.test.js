import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import VolunteerForm from 'Components/Forms/VolunteerForm';
import render from '../../../__mocks__/render';

describe('VolunteerForm component', () => {
  const message = jest.fn();
  const setDocFront = jest.fn();
  const setDocBack = jest.fn();
  const docFront = jest.fn();
  const docBack = jest.fn();

  test('has a document number input', () => {
    render(
      <VolunteerForm
        message={message}
        setDocFront={setDocFront}
        setDocBack={setDocBack}
        docFront={docFront}
        docBack={docBack}
      />
    );

    expect(screen.getByLabelText('userId')).toBeInTheDocument();
  });

  test('has a document face input', () => {
    render(
      <VolunteerForm
        message={message}
        setDocFront={setDocFront}
        setDocBack={setDocBack}
        docFront={docFront}
        docBack={docBack}
      />
    );

    expect(screen.getByLabelText('documentFace')).toBeInTheDocument();
  });

  test('onChange document face input', () => {
    render(
      <VolunteerForm
        message={message}
        setDocFront={setDocFront}
        setDocBack={setDocBack}
        docFront={docFront}
        docBack={docBack}
      />
    );

    const documentFaceFile = new File(['dummy content'], 'example.png', { type: 'image/png' });
    Object.defineProperty(screen.getByLabelText('documentFace'), 'files', {
      value: [documentFaceFile],
    });
    fireEvent.change(screen.getByLabelText('documentFace'));
    expect(setDocFront).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText('documentFace').files[0]).toStrictEqual(documentFaceFile);
    expect(screen.getByLabelText('documentFace').files).toHaveLength(1);
  });

  test('has a document back input', () => {
    render(
      <VolunteerForm
        message={message}
        setDocFront={setDocFront}
        setDocBack={setDocBack}
        docFront={docFront}
        docBack={docBack}
      />
    );

    expect(screen.getByLabelText('documentBack')).toBeInTheDocument();
  });

  test('onChange document back input', () => {
    render(
      <VolunteerForm
        message={message}
        setDocFront={setDocFront}
        setDocBack={setDocBack}
        docFront={docFront}
        docBack={docBack}
      />
    );

    const documentBackFile = new File(['dummy content'], 'example.png', { type: 'image/png' });
    Object.defineProperty(screen.getByLabelText('documentBack'), 'files', {
      value: [documentBackFile],
    });
    fireEvent.change(screen.getByLabelText('documentBack'));
    expect(setDocBack).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText('documentBack').files[0]).toStrictEqual(documentBackFile);
    expect(screen.getByLabelText('documentBack').files).toHaveLength(1);
  });
});
