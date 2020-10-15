import React from 'react';
import { Box, Text } from 'grommet';
import { DateTime } from 'luxon';

const Notification = (item) => {
  const dateToPrint = () => {
    const dateTime = DateTime.fromISO(item.createdAt);
    if (dateTime.toFormat('dd/MM/yyyy') === DateTime.local().toFormat('dd/MM/yyyy')) {
      return dateTime.toFormat('HH:mm');
    }
    if (dateTime.toFormat('yyyy') === DateTime.local().toFormat('yyyy')) {
      return dateTime.toFormat('dd/MM HH:mm');
    }
    return dateTime.toFormat('dd/MM/yyyy HH:mm');
  };
  return (
    <Box direction="row" justify="between" fill="horizontal" align="center" gap="small" style={{ minHeight: '50px' }} key={item.id}>
      {item.status === 'not_seen' && <Box round background="brand" style={{ height: '10px', width: '10px' }} id="new-box"></Box>}
      <Box>
        <Text style={{ fontWeight: 'bold' }}>{item.id}:{item.title}</Text>
        <Text>{item.body}</Text>
      </Box>
      <Text size="small">{dateToPrint()}</Text>
    </Box>
  );
};

export default Notification;
