/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Box, Button, Grid, Heading, TextInput, Layer, Text,
} from 'grommet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import usersService from '../../api/users.service';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidLogin, setInvalid] = useState(false);
  const [errorMessage, setError] = useState('');

  useEffect(() => {
    if ((props.data)) {
      props.history.push('/perfil');
    }
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validate = async () => {
    let userInfo;
    try {
      await usersService.login({
        'user': {
          'email': email,
          'password': password,
        },
      }).then(
        (response) => { userInfo = response.data; userInfo.token = response.headers.authorization; }
      );
      props.login(userInfo);
      props.history.push('/perfil');
    } catch (error) {
      console.log(error);
      setInvalid(true);
      if (password === '') setError('Debe proporcionar una contrasena!');
      else if (email === '') setError('Debe proporcinar un email!');
      else setError('Credenciales invalidas.');
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
        <TextInput placeholder="Correo electronico" onChange={handleEmail} />
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
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  data: PropTypes.object,
};

Login.defaultProps = {
  data: undefined,
};

export default Login;
