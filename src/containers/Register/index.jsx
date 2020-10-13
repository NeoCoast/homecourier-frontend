import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Grid, Button, Heading, Avatar, Form, Text,
} from 'grommet';
import volunteerService from 'Api/volunteer.service';
import helpeeService from 'Api/helpee.service';
import GeneralUserForm from 'Components/Forms/GeneralUserForm';
import ErrorModal from 'Components/Modals/ErrorModal';
import UploadProfileModal from 'Components/Modals/UploadProfileModal';
import Add from 'Assets/add-image.svg';
import VolunteerForm from 'Components/Forms/VolunteerForm';
import { dataURItoBlob } from 'Helpers/utils.helper';
import Spinner from 'Components/Utils/Spinner';
import ReactTooltip from 'react-tooltip';
import RegisterConfirm from './ConfirmPage';

const Register = ({ volunteer }) => {
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicModal, setProfilePicModal] = useState(false);
  const [docFront, setDocFront] = useState(null);
  const [docBack, setDocBack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [image, setImage] = useState(null);

  const submitService = volunteer ? volunteerService : helpeeService;
  const headingMessage = volunteer ? ', gracias por querer ayudar' : ' a HomeCourier';

  const message = (msg) => <Text size="small">{msg}</Text>;

  const errorMessage = (msg) => (
    <Text size="small" color="red">
      {msg}
    </Text>
  );

  const submit = async (formValues) => {
    const values = { ...formValues.value };

    values.birthDate = `${values.birthDay}/${values.birthMonth.month}/${values.birthYear}`;
    delete values.birthDay;
    delete values.birthMonth;
    delete values.birthYear;
    delete values.repeatPassword;
    delete values.documentFace;
    delete values.documentBack;

    if (values.userId) {
      values.documentNumber = values.userId;
      values.documentTypeId = 1; // For now we only work with CI
      delete values.userId;
    }

    if (docFront) values.documentFacePic = docFront;
    if (docBack) values.documentBackPic = docBack;
    if (profilePic) values.avatar = dataURItoBlob(profilePic);
    else delete values.avatar;

    try {
      setLoading(true);
      const response = await submitService.create(values);
      setLoading(false);
      if (!!response.status && response.status === 400) {
        setErrorModalMessage('Verifique que los datos introducidos sean correctos');
        setErrorModal(true);
      } else if (response.username) {
        setUsername(response.username);
      }
    } catch (error) {
      setLoading(false);
      setErrorModalMessage('Ha ocurrido un error inesperado.');
      setErrorModal(true);
    }
  };

  if (username) return <RegisterConfirm username={username} />;

  return (
    <Grid
      align="stretch"
      rows={['fit']}
      columns={['auto', ['auto', 'large'], 'auto']}
      gap="small"
      pad="medium"
      areas={[
        { name: 'left', start: [0, 0], end: [0, 0] },
        { name: 'center', start: [1, 0], end: [1, 0] },
        { name: 'right', start: [2, 0], end: [2, 0] },
      ]}
    >
      {errorModal && (
        <ErrorModal errorMessage={errorModalMessage} setShow={setErrorModal} show={errorModal} />
      )}
      {profilePicModal && <UploadProfileModal setShow={setProfilePicModal} setPreview={setProfilePic} image={image} setImage={setImage} />}
      {loading && <Spinner />}
      <Box
        background="white"
        align="center"
        gridArea="center"
        elevation="medium"
        pad={{ horizontal: '5vw', vertical: 'large' }}
        gap="small"
        round="12px"
        direction="column"
      >
        <Heading alignSelf="center" level="3">
          {`¡Bienvenido${headingMessage}!`}
        </Heading>

        <Box direction="row" gap="small">
          <Avatar
            data-tip
            data-for="pic-tooltip"
            size="xlarge"
            src={profilePic || Add}
            border="all"
            onClick={() => setProfilePicModal(true)}
          />
        </Box>
        <ReactTooltip place="bottom" type="info" effect="float" id="pic-tooltip">
          Sube tu foto de perfil
        </ReactTooltip>

        <Form
          onSubmit={submit}
          messages={{
            required: 'Requerido',
          }}
        >
          <GeneralUserForm message={message} errorMessage={errorMessage} />
          {volunteer && (
            <VolunteerForm
              message={message}
              errorMessage={errorMessage}
              setDocFront={setDocFront}
              setDocBack={setDocBack}
              docFront={docFront}
              docBack={docBack}
            />
          )}
          <Box fill pad={{ horizontal: '10vw', top: 'medium' }}>
            <Button primary label="Registrarse" fill="horizontal" type="submit" disabled={loading} />
          </Box>
        </Form>
      </Box>
    </Grid>
  );
};

Register.propTypes = {
  volunteer: PropTypes.bool,
};

Register.defaultProps = {
  volunteer: false,
};

export default Register;
