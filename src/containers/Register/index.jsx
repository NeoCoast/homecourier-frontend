import React from 'react';
import { Box, Grid, TextInput, Button, Heading, Avatar, Form, FormField, Text } from 'grommet';
import { useHistory } from 'react-router-dom';
// import usersService from '../../api/users.service';
import BirthDatePicker from '../../components/Utils/BirthDatePicker/datepicker';
// import { DateTime } from 'luxon';

const Register = () => {
  const history = useHistory();
  const submit = () => history.push('/register-ok');

  const message = (msg) => <Text size="small">{msg}</Text>;
  const errorMessage = (msg) => (
    <Text size="small" color="red">
      {msg}
    </Text>
  );

  const validateEmail = (value) => {
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(value)) return { status: 'error', message: errorMessage('Inserte un email válido') };
    return { status: 'info' };
  };

  const validatePassword = (value, formValues) => {
    if (value !== formValues.password) return { status: 'error', message: errorMessage('Las contraseñas no coinciden') };
    return { status: 'info' };
  };

  const validateDay = (value) => {
    if (Number.isNaN(Number(value)) || Number(value) > 31 || Number(value) <= 0) {
      return { status: 'error', message: errorMessage('No valido') };
    }
    return { status: 'info' };
  };

  const validateYear = (value) => {
    if (Number.isNaN(Number(value))) {
      return { status: 'error', message: errorMessage('No valido') };
    }
    return { status: 'info' };
  };
  // TODO: submit form
  // const submit = async () => {
  //   const birthDate = `${day}/${month}/${year}`;

  //   try {
  //     await usersService.create({
  //       name,
  //       lastname,
  //       email,
  //       username,
  //       password,
  //       address,
  //       birthDate,
  //     });
  //   } catch (error) {
  //     console.error('error: ', error);
  //   }
  // };

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
      <Box background="white" align="center" gridArea="center" elevation="medium" pad="large" gap="small" round="5px" direction="column">
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
          <Box direction="row-responsive" gap="small" fill="horizontal" justify="stretch" alignContent="around">
            <FormField name="username" htmlfor="username" label={message('Nombre de Usuario')} fill required>
              <TextInput name="username" id="username" />
            </FormField>

            <FormField name="email" htmlfor="email" label={message('Email')} fill validate={validateEmail}>
              <TextInput name="email" id="email" />
            </FormField>
          </Box>

          <Box direction="row-responsive" gap="small" fill="horizontal" justify="stretch" alignContent="around">
            <FormField name="name" htmlfor="name" label={message('Nombre')} fill required>
              <TextInput id="name" name="name" />
            </FormField>

            <FormField name="lastname" htmlfor="lastname" label={message('Apellido')} fill required>
              <TextInput id="lastname" name="lastname" />
            </FormField>
          </Box>

          <Box direction="row-responsive" gap="small" fill="horizontal" justify="center" alignContent="around">
            <FormField name="password" htmlfor="password" label={message('Contraseña')} required fill>
              <TextInput name="password" id="password" type="password" />
            </FormField>

            <FormField
              name="repeatPassword"
              htmlfor="repeatPassword"
              label={message('Repetir Contraseña')}
              fill
              required
              validate={validatePassword}
            >
              <TextInput name="repeatPassword" id="repeatPassword" type="password" />
            </FormField>
          </Box>

          <Box direction="row-responsive" gap="small" fill="horizontal" justify="center" alignContent="around">
            <FormField name="adress" htmlfor="adress" label={message('Dirección')} fill required>
              <TextInput name="adress" id="adress" />
            </FormField>

            <BirthDatePicker validateDay={validateDay} validateYear={validateYear} />
          </Box>

          <Button primary label="Registrarse" fill="horizontal" type="submit" />
        </Form>
      </Box>
    </Grid>
  );
};

export default Register;
