/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  Box, Button, Grid, Heading, TextInput, Text, FormField, Form,
} from 'grommet';
import { Link } from 'react-router-dom';
import usersService from 'Api/users.service';
import volunteersService from 'Api/volunteer.service';
import helpeesService from 'Api/helpee.service';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from 'Actions/logUser';
import Spinner from 'Components/Utils/Spinner';
import ErrorModal from 'Components/Modals/ErrorModal';
import { validateEmail } from 'Helpers/validator.helper';
import { ROUTES } from 'Data/constants';

const Login = () => {
  const history = useHistory();
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const errorMessage = (msg) => (
    <Text size="small" color="red">
      {msg}
    </Text>
  );

  const signIn = async (Forms) => {
    const loginResponse = await usersService.login({
      user: {
        email: Forms.value.email,
        password: Forms.value.password,
      },
    });
    const info = loginResponse.data;
    info.token = loginResponse.headers.authorization;
    await dispatch(login(info));
    return info;
  };

  const loadUserInfo = async (user) => {
    const response = user.documentNumber
      ? await volunteersService.info(user.id)
      : await helpeesService.info(user.id);
    const userInfo = response.data;
    userInfo.token = user.token;
    const rating = user.documentNumber
      ? await volunteersService.pendingRating(userInfo.id)
      : await helpeesService.pendingRating(userInfo.id);
    userInfo.pendings = rating.pendings;
    await dispatch(login(userInfo));
  };

  const submitLogin = async (Forms) => {
    try {
      setLoading(true);
      const loginData = await signIn(Forms);
      await loadUserInfo(loginData);
      history.push(ROUTES.profile);
    } catch (failure) {
      setLoading(false);
      console.log(failure);
      setInvalid(true);
      setError('Credenciales inválidas.');
    }
  };

  return (
    <Grid
      align="stretch"
      rows={['fit']}
      columns={['auto', ['auto', 'medium'], 'auto']}
      gap="small"
      pad="medium"
      areas={[
        { name: 'left', start: [0, 0], end: [0, 0] },
        { name: 'center', start: [1, 0], end: [1, 0] },
        { name: 'right', start: [2, 0], end: [2, 0] },
      ]}
    >
      <Box
        align="center"
        gridArea="center"
        elevation="medium"
        pad="large"
        gap="medium"
        round="5px"
        direction="column"
        background="white"
      >
        <Heading level="2">Inicie sesión</Heading>
        <Form onSubmit={submitLogin} messages={{ required: 'Requerido' }}>
          <FormField name="email" validate={(value) => validateEmail(value, errorMessage)} required>
            <TextInput id="email" aria-label="email" name="email" placeholder="Correo electrónico" />
          </FormField>
          <FormField name="password" required>
            <TextInput id="password" aria-label="password" name="password" placeholder="Contraseña" type="password" />
          </FormField>
          <Button primary disabled={loading} label="Ingresar" fill="horizontal" type="submit" />
        </Form>
        <Box fill gap="small">
          <Box direction="row" fill justify="center" gap="small">
            <Text size="small">No eres usuario aún?</Text>
            <Link to="/register" style={{ lineHeight: '20px' }}>
              Crea tu cuenta
            </Link>
          </Box>
          <Box direction="row" fill justify="center" gap="small">
            <Text size="small">Quieres ayudar?</Text>
            <Link to="/register-volunteer" style={{ lineHeight: '20px' }}>
              Regístrate Aquí
            </Link>
          </Box>
        </Box>

        {invalid && <ErrorModal errorMessage={error} setShow={setInvalid} show={invalid} />}
        {loading && <Spinner />}
      </Box>
    </Grid>
  );
};

export default Login;
