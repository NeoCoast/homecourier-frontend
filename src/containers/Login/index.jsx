import React from 'react';
import { Box, Button, Grid, Heading, TextInput } from 'grommet';
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
      <Heading level="2">Inicie sesión</Heading>
      <TextInput placeholder="Nombre de Usuario" disabled />
      <TextInput placeholder="Contraseña" disabled />
      <Button primary label="Login" fill="horizontal" disabled />
      <Link to="/register" style={{ width: '100%' }}>
        <Button secondary label="Registrarse" fill="horizontal" />
      </Link>
    </Box>
  </Grid>
);

export default Login;
