import {
  Box, FormField, MaskedInput, TextInput,
} from 'grommet';
import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';

const VolunteerForm = ({ message, setDocFront, setDocBack }) => {
  const mask = [
    {
      lenght: [1],
      regexp: /^[0-9]$/,
      placeholder: '1',
    },
    {
      fixed: '.',
    },
    {
      lenght: [3],
      regexp: /^[0-9]{0,3}$/,
      placeholder: '000',
    },
    {
      fixed: '.',
    },
    {
      lenght: [3],
      regexp: /^[0-9]{0,3}$/,
      placeholder: '000',
    },
    {
      fixed: '-',
    },
    {
      lenght: [0, 1],
      regexp: /^[0-9]?$/,
      placeholder: '0',
    },
  ];
  return (
    <Box>
      <Box direction="row-responsive" gap="small" fill="horizontal" justify="stretch" alignContent="around">
        <FormField name="userId" htmlFor="userId" label={message('Numero de Documento')} fill required>
          <MaskedInput data-tip="React-tooltip" name="userId" id="userId" mask={mask} />
        </FormField>
        <ReactTooltip place="bottom" type="info" effect="float">
          Si su CI es menor a un millon ingrese 0 al comienzo.
        </ReactTooltip>
        <FormField name="documentFace" htmlFor="documentFace" label={message('Frente del Documento')} fill required>
          <TextInput name="documentFace" id="documentFace" type="file" size="xsmall" style={{ padding: '9px' }} onChange={(event) => setDocFront(event.target.files[0])} />
        </FormField>
        <FormField name="documentBack" htmlFor="documentBack" label={message('Dorso  del Documento ')} fill required>
          <TextInput name="documentBack" id="documentBack" type="file" size="xsmall" style={{ padding: '9px' }} onChange={(event) => setDocBack(event.target.files[0])} />
        </FormField>
      </Box>
    </Box>
  );
};

VolunteerForm.propTypes = {
  message: PropTypes.func.isRequired,
  setDocFront: PropTypes.func.isRequired,
  setDocBack: PropTypes.func.isRequired,
};

export default VolunteerForm;
