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

const GeneralUserForm = ({ message, errorMessage, isMinor }) => (
  <Box>
    <Box direction="row-responsive" gap="small" fill="horizontal" justify="stretch" alignContent="around">
      <FormField name="username" htmlfor="username" label={message('Nombre de usuario')} fill required>
        <TextInput name="username" id="username" />
      </FormField>

      <FormField
        name="email"
        htmlfor="email"
        label={message('Email')}
        fill
        validate={(value) => validateEmail(value, errorMessage)}
      >
        <TextInput name="email" id="email" />
      </FormField>
    </Box>

    <Box direction="row-responsive" gap="small" fill="horizontal" justify="stretch" alignContent="around">
      <FormField name="name" htmlfor="name" label={message('Nombre')} fill required>
        <TextInput id="name" name="name" />
      </FormField>

      <FormField name="lastname" htmlfor="lastname" label={message('Apellido')} fill required>
        <TextInput id="lastname" name="lastname" />
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
        <TextInput name="password" id="password" type="password" />
      </FormField>

      <FormField
        name="repeatPassword"
        htmlfor="repeatPassword"
        label={message('Repetir contraseña')}
        fill
        required
        validate={(value, formValues) => validateRepeatPassword(value, formValues, errorMessage)}
      >
        <TextInput name="repeatPassword" id="repeatPassword" type="password" />
      </FormField>
    </Box>

    <Box direction="row-responsive" gap="small" fill="horizontal" justify="center" alignContent="around">
      <FormField name="address" htmlfor="address" label={message('Dirección')} fill required>
        <TextInput name="address" id="address" />
      </FormField>

      <BirthDatePicker
        validateDay={(value) => validateDay(value, errorMessage)}
        validateYear={(value) => validateYear(value, errorMessage)}
        isMinor={isMinor}
      />
    </Box>
  </Box>
);

GeneralUserForm.propTypes = {
  message: PropTypes.func.isRequired,
  errorMessage: PropTypes.func.isRequired,
  isMinor: PropTypes.bool.isRequired,
};

export default GeneralUserForm;
