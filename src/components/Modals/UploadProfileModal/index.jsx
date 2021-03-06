import {
  Layer, Box, Heading, Button, Text,
} from 'grommet';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar-edit';
import { validateImages } from 'Helpers/validator.helper';

const UploadProfileModal = ({
  image, setImage, setPreview, setShow,
}) => {
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
    const message = validateImages(element.target.files[0]);

    if (message) {
      element.target.value = '';
      setError(message);
    }
  };

  const onImageUpload = (profileImage) => {
    const url = URL.createObjectURL(profileImage);
    setImage(url);
  };

  return (
    <Layer responsive={false} margin="small">
      <Box overflow="auto" pad="medium" gap="small" justify="center" align="center">
        <Heading level="3" margin="none">Agregue una foto de perfil</Heading>
        <Box overflow="auto" style={{ maxWidth: '100%' }}>
          <Avatar
            width={320}
            height={298}
            onCrop={onCrop}
            onClose={() => setPreview(null)}
            onBeforeFileLoad={(elem) => validate(elem)}
            label="Agregue una foto"
            src={image}
            onFileLoad={onImageUpload}
          />
        </Box>
        {error && <Text color="status-critical"> {error} </Text>}
        <Box direction="row" gap="medium" align="start">
          <Button secondary label="Cancelar" onClick={onCloseCancel} />
          <Button primary label="Guardar" onClick={() => (error ? null : setShow(false))} />
        </Box>
      </Box>
    </Layer>
  );
};

UploadProfileModal.propTypes = {
  image: PropTypes.string,
  setImage: PropTypes.func.isRequired,
  setPreview: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
};

UploadProfileModal.defaultProps = {
  image: null,
};

export default UploadProfileModal;
