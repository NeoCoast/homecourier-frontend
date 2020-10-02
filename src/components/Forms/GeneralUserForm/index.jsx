import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormField, TextInput } from 'grommet';
import BirthDatePicker from 'Components/Utils/BirthDatePicker';

const GeneralUserForm = ({ message, errorMessage }) => {
  const validateEmail = (value) => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(value)) {
      return { status: 'error', message: errorMessage('Inserte un email válido') };
    }
    return { status: 'info' };
  };

  const validatePassword = (value) => {
    if (value.length <= 6) {
      return {
        status: 'error',
        message: errorMessage('Las contraseñas deben tener al menos 6 caracteres'),
      };
    }
    return { status: 'info' };
  };

  const validateRepeatPassword = (value, formValues) => {
    if (value !== formValues.password) {
      return { status: 'error', message: errorMessage('Las contraseñas no coinciden') };
    }
    return { status: 'info' };
  };

  const validateDay = (value) => {
    if (Number.isNaN(Number(value)) || Number(value) > 31 || Number(value) <= 0) {
      return { status: 'error', message: errorMessage('No valido') };
    }
    return { status: 'info' };
  };

  const validateYear = (value) => {
    if (Number.isNaN(Number(value))) {
      return { status: 'error', message: errorMessage('No valido') };
    }
    return { status: 'info' };
  };

  return (
    <Box>
      <Box
        direction="row-responsive"
        gap="small"
        fill="horizontal"
        justify="stretch"
        alignContent="around"
      >
        <FormField
          name="username"
          htmlfor="username"
          label={message('Nombre de Usuario')}
          fill
          required
        >
          <TextInput name="username" id="username" />
        </FormField>

        <FormField
          name="email"
          htmlfor="email"
          label={message('Email')}
          fill
          validate={validateEmail}
        >
          <TextInput name="email" id="email" />
        </FormField>
      </Box>

      <Box
        direction="row-responsive"
        gap="small"
        fill="horizontal"
        justify="stretch"
        alignContent="around"
      >
        <FormField name="name" htmlfor="name" label={message('Nombre')} fill required>
          <TextInput id="name" name="name" />
        </FormField>

        <FormField name="lastname" htmlfor="lastname" label={message('Apellido')} fill required>
          <TextInput id="lastname" name="lastname" />
        </FormField>
      </Box>

      <Box
        direction="row-responsive"
        gap="small"
        fill="horizontal"
        justify="center"
        alignContent="around"
      >
        <FormField
          name="password"
          htmlfor="password"
          label={message('Contraseña')}
          required
          fill
          validate={validatePassword}
        >
          <TextInput name="password" id="password" type="password" />
        </FormField>

        <FormField
          name="repeatPassword"
          htmlfor="repeatPassword"
          label={message('Repetir Contraseña')}
          fill
          required
          validate={validateRepeatPassword}
        >
          <TextInput name="repeatPassword" id="repeatPassword" type="password" />
        </FormField>
      </Box>

      <Box
        direction="row-responsive"
        gap="small"
        fill="horizontal"
        justify="center"
        alignContent="around"
      >
        <FormField name="address" htmlfor="address" label={message('Dirección')} fill required>
          <TextInput name="address" id="address" />
        </FormField>

        <BirthDatePicker validateDay={validateDay} validateYear={validateYear} />
      </Box>
    </Box>
  );
};

GeneralUserForm.propTypes = {
  message: PropTypes.func.isRequired,
  errorMessage: PropTypes.func.isRequired,
};

export default GeneralUserForm;
