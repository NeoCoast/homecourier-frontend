import React, { useState } from 'react';
import { Box, Grid, Button, Heading, Avatar, Form, Text } from 'grommet';
import { useHistory } from 'react-router-dom';
import helpeeService from 'Api/helpee.service';
import GeneralUserForm from 'Components/Forms/GeneralUserForm';
import ErrorModal from 'Components/Modals/ErrorModal';
// import { DateTime } from 'luxon';

const Register = () => {
  const history = useHistory();
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const message = (msg) => <Text size="small">{msg}</Text>;
  const errorMessage = (msg) => (
    <Text size="small" color="red">
      {msg}
    </Text>
  );

  const submit = async (formValues) => {
    const values = JSON.parse(JSON.stringify(formValues.value));
    console.log(values);
    values.birthDate = `${values.birthDay}/${values.birthMonth.month}/${values.birthYear}`;
    delete values.birthDay;
    delete values.birthMonth;
    delete values.birthYear;
    delete values.repeatPassword;

    try {
      const response = await helpeeService.create(values);
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
      {errorModal && (
        <ErrorModal errorMessage={errorModalMessage} setShow={setErrorModal} show={errorModal} />
      )}
      <Box
        background="white"
        align="center"
        gridArea="center"
        elevation="medium"
        pad="large"
        gap="small"
        round="5px"
        direction="column"
      >
        <Heading alignSelf="center" size="xsmall">
          ¡Bienvenido a HomeCourier!
        </Heading>

        <Box direction="row" gap="small">
          <Avatar size="xlarge" src="https://robohash.org/miraak" border="all" />
        </Box>

        <Form
          onSubmit={submit}
          messages={{
            required: errorMessage('Este campo no puede estar vacio'),
          }}
        >
          <GeneralUserForm message={message} errorMessage={errorMessage} />
          <Button primary label="Registrarse" fill="horizontal" type="submit" />
        </Form>
      </Box>
    </Grid>
  );
};

export default Register;
