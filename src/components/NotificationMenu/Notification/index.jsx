import React from 'react';
import { Box, Text } from 'grommet';
import { dateToPrint } from 'Helpers/utils.helper';

const Notification = (item) => (
  <Box direction="row" justify="between" fill="horizontal" align="center" gap="small" style={{ minHeight: '50px' }} key={item.id}>
    {item.status === 'not_seen' && <Box round background="brand" style={{ height: '10px', width: '10px' }} id="new-box"></Box>}
    <Box>
      <Text style={{ fontWeight: 'bold' }}>{item.id}:{item.title}</Text>
      <Text>{item.body}</Text>
    </Box>
    <Text size="small">{dateToPrint(item.createdAt)}</Text>
  </Box>
);

export default Notification;
