import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Select, TextInput,
} from 'grommet';

const BirthDatePicker = ({ day, month, year }) => {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  return (
    <Grid
      rows={['full']}
      columns={['4rem', '10rem', 'auto']}
      fill="horizontal"
      gap="small"
    >
      <TextInput
        placeholder="Dia"
        onChange={(event) => day(event.target.value)}
      />
      <Select
        placeholder="Mes"
        options={months}
        onChange={({ option }) => month(option)}
      />
      <TextInput
        placeholder="Año"
        onChange={(event) => year(event.target.value)}

      />
    </Grid>

  );
};

BirthDatePicker.propTypes = {
  day: PropTypes.func.isRequired,
  month: PropTypes.func.isRequired,
  year: PropTypes.func.isRequired,
};

export default BirthDatePicker;
