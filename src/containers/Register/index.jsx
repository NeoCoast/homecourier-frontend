import React, { useState } from 'react';
import {
  Box, Grid, TextInput, Button, Heading, Avatar,
} from 'grommet';
import usersService from '../../api/users.service';
import BirthDatePicker from '../../components/Utils/BirthDatePicker/datepicker';

const Register = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [address, setAddress] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const submit = async () => {
    const birthDate = `${day}/${month}/${year}`;

    try {
      await usersService.create({
        name,
        lastname,
        email,
        username,
        password,
        address,
        birthDate,
      });
    } catch (error) {
      console.error('error: ', error);
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
      <Box background="white" align="center" gridArea="center" elevation="medium" pad="large" gap="small" round="5px" direction="column">
        <Heading alignSelf="center" size="xsmall">
          ¡Bienvenido a HomeCourier!
        </Heading>

        <Box direction="row" gap="small">
          <Avatar size="xlarge" src="https://robohash.org/miraak" border="all" />
        </Box>

        <Box direction="row-responsive" gap="small" fill="horizontal" justify="center" alignContent="around">
          <TextInput placeholder="Nombre" value={name} onChange={(event) => setName(event.target.value)} />
          <TextInput placeholder="Apellido" value={lastname} onChange={(event) => setLastname(event.target.value)} />
        </Box>
        <Box direction="row-responsive" gap="small" fill="horizontal" justify="center" alignContent="around">
          <TextInput placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <TextInput placeholder="Nombre de Usuario" value={username} onChange={(event) => setUsername(event.target.value)} />
        </Box>
        <Box direction="row-responsive" gap="small" fill="horizontal" justify="center" alignContent="around">
          <TextInput placeholder="Contraseña" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <TextInput
            placeholder="Repetir Contraseña"
            type="password"
            value={repeatPassword}
            onChange={(event) => setRepeatPassword(event.target.value)}
          />
        </Box>
        <Box direction="row-responsive" gap="small" fill="horizontal" justify="center" alignContent="around">
          <TextInput placeholder="Dirección" value={address} onChange={(event) => setAddress(event.target.value)} />
          <BirthDatePicker day={setDay} month={setMonth} year={setYear} />
        </Box>

        <Button primary label="Registrarse" fill="horizontal" onClick={submit} />
      </Box>
    </Grid>
  );
};

export default Register;
