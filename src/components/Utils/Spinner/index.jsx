import { Layer } from 'grommet';
import React from 'react';
import { DotLoader } from 'react-spinners';

const Spinner = () => (
  <Layer plain>
    <DotLoader loading size={80} color="#54a3ff" />
  </Layer>
);

export default Spinner;
