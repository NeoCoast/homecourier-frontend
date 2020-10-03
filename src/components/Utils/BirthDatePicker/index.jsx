import React from 'react';
import PropTypes from 'prop-types';
import { FormField, Grid, Select, TextInput, Text, Box } from 'grommet';
import { MONTHS } from 'Data/utils';

const BirthDatePicker = ({ validateDay, validateYear }) => (
  <Box fill>
    <Text size="small" margin={{ top: '5px', bottom: '5px' }}>
      Fecha de Nacimiento:
    </Text>
    <Grid rows={['full']} columns={['4rem', '10rem', 'auto']} fill gap="small">
      <FormField name="birthDay" validate={validateDay}>
        <TextInput placeholder="Dia" name="birthDay" id="birthDay" required />
      </FormField>
      <FormField name="birthMonth">
        <Select placeholder="Mes" options={MONTHS} labelKey="displayValue" valueKey="displayValue" name="birthMonth" id="birthMonth" required />
      </FormField>
      <FormField name="birthYear" validate={validateYear}>
        <TextInput placeholder="Año" name="birthYear" id="birthYear" required />
      </FormField>
    </Grid>
  </Box>
);

BirthDatePicker.propTypes = {
  validateDay: PropTypes.func.isRequired,
  validateYear: PropTypes.func.isRequired,
};

export default BirthDatePicker;
