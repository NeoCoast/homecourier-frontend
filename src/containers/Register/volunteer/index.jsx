import React, { useState } from 'react';
import {
  Box, Grid, Button, Heading, Avatar, Form, Text,
} from 'grommet';
import { useHistory } from 'react-router-dom';
import volunteerService from 'Api/volunteer.service';
import GeneralUserForm from 'Components/Forms/GeneralUserForm';
import ErrorModal from 'Components/Modals/ErrorModal';
import UploadProfileModal from 'Components/Modals/UploadProfileModal';
import Add from 'Assets/add-image.svg';
import VolunteerForm from 'Components/Forms/VolunteerForm';
import dataURItoBlob from 'Data/Base64ToBlob';

const RegisterVolunteer = () => {
  const history = useHistory();

  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicModal, setProfilePicModal] = useState(false);
  const [docFront, setDocFront] = useState(null);
  const [docBack, setDocBack] = useState(null);

  const message = (msg) => <Text size="small">{msg}</Text>;

  const errorMessage = (msg) => (
    <Text size="small" color="red">
      {msg}
    </Text>
  );

  const submit = async (formValues) => {
    const values = JSON.parse(JSON.stringify(formValues.value));

    values.birthDate = `${values.birthDay}/${values.birthMonth.month}/${values.birthYear}`;
    delete values.birthDay;
    delete values.birthMonth;
    delete values.birthYear;
    delete values.repeatPassword;
    values.documentFace = docFront;
    values.documentBack = docBack;
    values.avatar = profilePic ? dataURItoBlob(profilePic) : null;

    try {
      const response = await volunteerService.create(values);
      if (!!response.status && response.status === 400) {
        setErrorModalMessage('Verifique que los datos introducidos sean correctos');
        setErrorModal(true);
      } else if (response.username) {
        history.push({
          pathname: '/register-ok',
          username: response.username,
        });
      }
    } catch (error) {
      setErrorModalMessage('Ha ocurrido un error inesperado.');
      setErrorModal(true);
    }
  };

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
      {errorModal && <ErrorModal errorMessage={errorModalMessage} setShow={setErrorModal} show={errorModal} />}
      {profilePicModal && <UploadProfileModal setShow={setProfilePicModal} setPreview={setProfilePic} />}
      <Box background="white" align="center" gridArea="center" elevation="medium" pad="large" gap="small" round="5px" direction="column">
        <Heading alignSelf="center" size="xsmall">
          ¡Bienvenido a HomeCourier!
        </Heading>

        <Box direction="row" gap="small">
          <Avatar size="xlarge" src={profilePic || Add} border="all" onClick={() => setProfilePicModal(true)} />
        </Box>

        <Form
          onSubmit={submit}
          messages={{
            required: errorMessage('Este campo no puede estar vacio'),
          }}
        >
          <GeneralUserForm message={message} errorMessage={errorMessage} />
          <VolunteerForm message={message} errorMessage={errorMessage} setDocFront={setDocFront} setDocBack={setDocBack} />
          <Button primary label="Registrarse" fill="horizontal" type="submit" />
        </Form>
      </Box>
    </Grid>
  );
};

export default RegisterVolunteer;
