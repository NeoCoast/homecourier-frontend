import {
  Layer, Box, Heading, Button,
} from 'grommet';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar-edit';

const UploadProfileModal = ({ setPreview, setShow }) => {
  const onCrop = (imgPreview) => {
    setPreview(imgPreview);
  };

  const onCloseCancel = () => {
    setPreview(null);
    setShow(false);
  };
  return (
    <Layer>
      <Box margin="medium" gap="small" justify="center" align="center">
        <Heading level="3">Agregue una foto de perfil</Heading>
        <Avatar width={390} height={298} onCrop={onCrop} onClose={() => setPreview(null)} />
        <Box direction="row-responsive" gap="medium">
          <Button secondary label="Cancelar" onClick={onCloseCancel} />
          <Button primary label="Guardar" onClick={() => setShow(false)} />
        </Box>
      </Box>
    </Layer>
  );
};

UploadProfileModal.propTypes = {
  setPreview: PropTypes.isRequired,
  setShow: PropTypes.isRequired,
};

export default UploadProfileModal;
