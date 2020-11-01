import React from 'react';
import PropTypes from 'prop-types';
import {
  FormField, Grid, Select, TextInput, Text, Box,
} from 'grommet';
import { MONTHS } from 'Data/utils';

const BirthDatePicker = ({ validateDay, validateYear, isMinor }) => (
  <Box fill>
    <Text size="small" margin={{ top: '5px', bottom: '5px' }}>
      Fecha de nacimiento:
    </Text>
    <Grid rows={['full']} columns={['auto', '8rem', 'auto']} fill gap="small">
      <FormField name="birthDay" validate={validateDay} required>
        <TextInput
          aria-label="birthDay"
          placeholder="Día"
          name="birthDay"
          id="birthDay"
        />
      </FormField>
      <FormField name="birthMonth" required>
        <Select
          aria-label="birthMonth"
          placeholder="Mes"
          options={MONTHS}
          labelKey="displayValue"
          valueKey="displayValue"
          name="birthMonth"
          id="birthMonth"
        />
      </FormField>
      <FormField name="birthYear" validate={validateYear} required>
        <TextInput
          aria-label="birthYear"
          placeholder="Año"
          name="birthYear"
          id="birthYear"
        />
      </FormField>
    </Grid>
    {isMinor && <Text color="accent-2" size="small"> Debe ser mayor a 18 </Text>}
  </Box>
);

BirthDatePicker.propTypes = {
  validateDay: PropTypes.func.isRequired,
  validateYear: PropTypes.func.isRequired,
  isMinor: PropTypes.bool.isRequired,
};

export default BirthDatePicker;
