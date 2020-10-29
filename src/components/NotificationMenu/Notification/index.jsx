import React from 'react';
import { Box, Text } from 'grommet';
import { dateToPrint } from 'Helpers/utils.helper';

const Notification = (item) => (
  <Box direction="row" justify="between" fill="horizontal" align="center" gap="small" style={{ minHeight: '50px' }} key={item.id}>
    <Box align="center" direction="row" gap="small">
      {item.status === 'not_seen' && <Box round background="brand" style={{ height: '10px', width: '10px' }} id="new-box"></Box>}
      <Box style={{ maxWidth: '400px' }}>
        <Text truncate style={{ fontWeight: 'bold' }}>{item.title}</Text>
        <Text truncate>{item.body}</Text>
      </Box>
    </Box>
    <Box>
      <Text size="small">{dateToPrint(item.createdAt)}</Text>
    </Box>
  </Box>
);

export default Notification;
