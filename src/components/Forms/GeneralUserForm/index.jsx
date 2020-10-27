import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormField, TextInput } from 'grommet';
import BirthDatePicker from 'Components/Utils/BirthDatePicker';
import {
  validateDay,
  validateEmail,
  validatePassword,
  validateRepeatPassword,
  validateYear,
} from 'Helpers/validator.helper';

const GeneralUserForm = ({ message, errorMessage }) => (
  <Box>
    <Box direction="row-responsive" gap="small" fill="horizontal" justify="stretch" alignContent="around">
      <FormField
        name="username"
        htmlFor="username"
        label={message('Nombre de Usuario')}
        fill
        required
      >
        <TextInput
          aria-label="username"
          name="username"
          id="username"
        />
      </FormField>

      <FormField
        name="email"
        htmlfor="email"
        label={message('Email')}
        fill
        validate={(value) => validateEmail(value, errorMessage)}
      >
        <TextInput
          aria-label="email"
          name="email"
          id="email"
        />
      </FormField>
    </Box>

    <Box direction="row-responsive" gap="small" fill="horizontal" justify="stretch" alignContent="around">
      <FormField
        name="name"
        htmlfor="name"
        label={message('Nombre')}
        fill
        required
      >
        <TextInput
          aria-label="name"
          name="name"
          id="name"
        />
      </FormField>

      <FormField
        name="lastname"
        htmlfor="lastname"
        label={message('Apellido')}
        fill
        required
      >
        <TextInput
          aria-label="lastname"
          name="lastname"
          id="lastname"
        />
      </FormField>
    </Box>

    <Box direction="row-responsive" gap="small" fill="horizontal" justify="center" alignContent="around">
      <FormField
        name="password"
        htmlfor="password"
        label={message('Contraseña')}
        required
        fill
        validate={(value) => validatePassword(value, errorMessage)}
      >
        <TextInput
          aria-label="password"
          type="password"
          name="password"
          id="password"
        />
      </FormField>

      <FormField
        name="repeatPassword"
        htmlfor="repeatPassword"
        label={message('Repetir contraseña')}
        fill
        required
        validate={(value, formValues) => validateRepeatPassword(value, formValues, errorMessage)}
      >
        <TextInput
          aria-label="repeatPassword"
          type="password"
          name="repeatPassword"
          id="repeatPassword"
        />
      </FormField>
    </Box>

    <Box direction="row-responsive" gap="small" fill="horizontal" justify="center" alignContent="around">
      <FormField
        name="address"
        htmlfor="address"
        label={message('Dirección')}
        fill
        required
      >
        <TextInput
          aria-label="address"
          name="address"
          id="address"
        />
      </FormField>

      <BirthDatePicker
        validateDay={(value) => validateDay(value, errorMessage)}
        validateYear={(value) => validateYear(value, errorMessage)}
      />
    </Box>
  </Box>
);

GeneralUserForm.propTypes = {
  message: PropTypes.func.isRequired,
  errorMessage: PropTypes.func.isRequired,
};

export default GeneralUserForm;
