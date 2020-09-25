import React from 'react';
import './index.scss';
import { Box, Heading, Markdown } from 'grommet';

const Home = () => (
  <Box fill align="center">
    <Heading>Bienvenido!</Heading>
    <Markdown>## Lorem ipsum, [link](https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLj65iUKyj0nV8hP7hjZ9-XDJ3dpL4LRmm)</Markdown>
  </Box>
);

export default Home;
