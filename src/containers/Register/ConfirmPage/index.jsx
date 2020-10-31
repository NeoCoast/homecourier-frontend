import {
  Box, Card, Grid, Heading, Image, Paragraph, Button,
} from 'grommet';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import newEmail from 'Assets/new_email.gif';

const RegisterConfirm = ({ username }) => (
  <Grid columns={['auto', ['auto', 'large'], 'auto']} fill gap="small">
    <Box></Box>
    <Card alignSelf="center" background="white" pad="medium">
      <Heading level="2" alignSelf="center" margin="none" truncate style={{ maxWidth: '100%' }}>
        ¡Bienvenido, {username}!
      </Heading>
      <Box
        direction="row-responsive"
        gap="small"
        justify="center"
        alignContent="center"
        align="center"
      >
        <Box width="150px" height="150px" justify="center" alignSelf="center">
          <Image fit="contain" src={newEmail} />
        </Box>
        <Paragraph alignSelf="center">
          Su solicitud de registro se ha enviado correctamente, le hemos enviado un mail de
          confirmación a su casilla de correo.
        </Paragraph>
      </Box>
      <Box alignSelf="end">
        <Link to="/">
          <Button primary label="Volver al inicio" />
        </Link>
      </Box>

    </Card>
    <Box></Box>
  </Grid>
);

RegisterConfirm.propTypes = {
  username: PropTypes.string.isRequired,
};

export default RegisterConfirm;
