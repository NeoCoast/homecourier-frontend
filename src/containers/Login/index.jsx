import React from 'react';
import {
  Box, Button, Grid, Heading, TextInput, Text,
} from 'grommet';
import { Link } from 'react-router-dom';

const Login = () => (
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
    <Box align="center" gridArea="center" elevation="medium" pad="large" gap="medium" round="5px" direction="column" background="white">
      <Heading level="3">Inicie sesión</Heading>
      <TextInput placeholder="Nombre de Usuario" disabled />
      <TextInput placeholder="Contraseña" disabled />
      <Button primary label="Login" fill="horizontal" disabled />
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
    </Box>
  </Grid>
);

export default Login;
