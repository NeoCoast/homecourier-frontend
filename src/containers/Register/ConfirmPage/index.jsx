import { Box, Card, Grid, Heading, Text, Image, Paragraph } from 'grommet';
import React from 'react';
import newEmail from 'Assets/new_email.gif';

const registerConfirm = () => (
  <Grid columns={['auto', ['auto', 'large'], 'auto']} fill gap="small">
    <Box></Box>
    <Card alignSelf="center" background="white" pad="medium">
      <Heading level="2" alignSelf="center" margin="0">
        Exito!
      </Heading>
      <Box direction="row-responsive" gap="small" justify="center" alignContent="center" align="center">
        <Box width="150px" height="150px" justify="center" alignSelf="center">
          <Image fit="contain" src={newEmail} />
        </Box>
        <Paragraph alignSelf="center">
          Su solicitud de registro se ha enviado correctamente, le hemos enviado un mail de confirmacion a su casilla de correo.
        </Paragraph>
      </Box>
    </Card>
    <Box></Box>
  </Grid>
);

export default registerConfirm;
