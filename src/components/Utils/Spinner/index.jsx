import { Layer } from 'grommet';
import React from 'react';
import { RingLoader } from 'react-spinners';

const Spinner = () => (
  <Layer plain responsive={false}>
    <RingLoader loading size={80} color="#54a3ff" />
  </Layer>
);

export default Spinner;
