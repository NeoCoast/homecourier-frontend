import {
  Layer, Box, Heading, Button, Text,
} from 'grommet';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar-edit';
import { validateImages } from 'Helpers/validator.helper';

const UploadProfileModal = ({ setPreview, setShow }) => {
  const [error, setError] = useState(null);

  const onCrop = (imgPreview) => {
    setPreview(imgPreview);
  };

  const onCloseCancel = () => {
    setPreview(null);
    setShow(false);
  };

  const validate = (elem) => {
    const element = elem;
    validateImages(element.target.files[0], setError);
    if (error) element.target.value = '';
  };

  return (
    <Layer>
      <Box margin="medium" gap="small" justify="center" align="center">
        <Heading level="3">Agregue una foto de perfil</Heading>
        <Avatar
          width={390}
          height={298}
          onCrop={onCrop}
          onClose={() => setPreview(null)}
          onBeforeFileLoad={(elem) => validate(elem)}
        />
        {error && <Text color="status-critical"> {error} </Text>}
        <Box direction="row-responsive" gap="medium">
          <Button secondary label="Cancelar" onClick={onCloseCancel} />
          <Button primary label="Guardar" onClick={() => (error ? null : setShow(false))} />
        </Box>
      </Box>
    </Layer>
  );
};

UploadProfileModal.propTypes = {
  setPreview: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default UploadProfileModal;
