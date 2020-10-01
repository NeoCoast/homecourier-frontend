import React from 'react';
import PropTypes from 'prop-types';
import { FormField, Grid, Select, TextInput, Text, Box } from 'grommet';

const BirthDatePicker = ({ validateDay, validateYear }) => {
  const months = [
    { month: 1, displayValue: 'Enero' },
    { month: 2, displayValue: 'Febrero' },
    { month: 3, displayValue: 'Marzo' },
    { month: 4, displayValue: 'Abril' },
    { month: 5, displayValue: 'Mayo' },
    { month: 6, displayValue: 'Junio' },
    { month: 7, displayValue: 'Julio' },
    { month: 8, displayValue: 'Agosto' },
    { month: 9, displayValue: 'Septiembre' },
    { month: 10, displayValue: 'Octubre' },
    { month: 11, displayValue: 'Noviembre' },
    { month: 12, displayValue: 'Diciembre' },
  ];

  return (
    <Box fill>
      <Text size="small" margin={{ top: '5px', bottom: '5px' }}>
        Fecha de Nacimiento:
      </Text>
      <Grid rows={['full']} columns={['4rem', '10rem', 'auto']} fill gap="small">
        <FormField name="birthDay" validate={validateDay}>
          <TextInput placeholder="Dia" name="birthDay" id="birthMonth" required />
        </FormField>
        <FormField name="birthMonth">
          <Select
            placeholder="Mes"
            options={months}
            labelKey="displayValue"
            valueKey="displayValue"
            name="birthMonth"
            id="birthMonth"
            required
          />
        </FormField>
        <FormField name="birthYear" validate={validateYear}>
          <TextInput placeholder="Año" name="birthYear" id="birthYear" required />
        </FormField>
      </Grid>
    </Box>
  );
};

BirthDatePicker.propTypes = {
  validateDay: PropTypes.func.isRequired,
  validateYear: PropTypes.func.isRequired,
};

export default BirthDatePicker;
