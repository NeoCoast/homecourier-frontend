/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Box, Button, Grid, Heading, TextInput, Text,
} from 'grommet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import usersService from 'Api/users.service';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from 'Actions/logUser';
import Spinner from 'Components/Utils/Spinner';
import ErrorModal from 'Components/Modals/ErrorModal';

const Login = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const loggedIn = useSelector((state) => state.logUser.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn) history.push('/profile'); // Redirects to Profile
  }, [loggedIn]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validate = async () => {
    if (!password) { // Validates the input
      setError('Debe proporcionar una contraseña!');
      setInvalid(true);
    } else if (!email) {
      setError('Debe proporcionar un email!');
      setInvalid(true);
    } else {
      try {
        setLoading(true);
        const response = await usersService.login({
          user: {
            email,
            password,
          },
        });
        const userInfo = response.data; // Creates an object with user data and login token
        userInfo.token = response.headers.authorization;
        await dispatch(login(userInfo)); // Waits for redux's state to change
        setLoading(false);
        props.history.push('/profile');
      } catch (error) {
        setLoading(false);
        console.log(error);
        setInvalid(true);
        setError('Credenciales inválidas.');
      }
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
        <TextInput placeholder="Correo electrónico" onChange={handleEmail} />
        <TextInput placeholder="Contraseña" type="password" onChange={handlePassword} />
        <Button primary disabled={loading} label="Login" fill="horizontal" onClick={validate} />
        <Box fill gap="small">
          <Box direction="row" fill justify="center" gap="small">
            <Text size="small">No eres usuario aun?</Text>
            <Link to="/register" style={{ lineHeight: '20px' }}>
              Crea tu cuenta
            </Link>
          </Box>
          <Box direction="row" fill justify="center" gap="small">
            <Text size="small">Quieres ayudar?</Text>
            <Link to="/register-volunteer" style={{ lineHeight: '20px' }}>
              Registrate Aqui
            </Link>
          </Box>
        </Box>

        {invalid
        && (
          <ErrorModal
            errorMessage={errorMessage}
            setShow={setInvalid}
            show={invalid}
          />
        )}

        {loading && <Spinner />}

      </Box>
    </Grid>
  );
};

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
