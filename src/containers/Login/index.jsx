/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Box, Button, Grid, Heading, TextInput, Layer, Text,
} from 'grommet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import usersService from 'Api/users.service';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from 'Actions/logUser';

const Login = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidLogin, setInvalid] = useState(false);
  const [errorMessage, setError] = useState('');
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
        const response = await usersService.login({
          user: {
            email,
            password,
          },
        });
        console.log(response.headers.authorization);
        const userInfo = response.data; // Creates an object with user data and login token
        userInfo.token = response.headers.authorization;
        await dispatch(login(userInfo)); // Waits for redux's state to change
        props.history.push('/profile');
      } catch (error) {
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
        <Button primary label="Login" fill="horizontal" onClick={validate} />
        <Link to="/register" style={{ width: '100%' }}><Button secondary label="Registrarse" fill="horizontal" /></Link>

        {invalidLogin && (
          <Layer
            onEsc={() => setInvalid(false)}
            onClickOutside={() => setInvalid(false)}
          >
            <Text> {errorMessage} </Text>
            <Button label="Entendido" onClick={() => setInvalid(false)} />
          </Layer>
        )}
      </Box>
    </Grid>
  );
};

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
