import React from 'react';
import { Box, Text } from 'grommet';
import ClampLines from 'react-clamp-lines';
import { dateToPrint } from 'Helpers/utils.helper';

const Notification = (item) => (
  <Box
    direction="row"
    justify="between"
    fill="horizontal"
    align="center"
    gap="small"
    style={{
      minHeight: '50px',
      marginLeft: '10px',
      marginRight: '10px',
      cursor: 'pointer',
    }}
    key={item.id}
  >
    <Box align="center" direction="row" gap="small">
      {item.status === 'not_seen' && <Box round background="brand" height="10px" width="10px" id="new-box"></Box>}
      <Box style={{ maxWidth: '250px' }}>
        <Text truncate style={{ fontWeight: 'bold' }}>{item.title}</Text>
        <ClampLines
          text={`${item.body}!`}
          lines={1}
          buttons

          moreText="Ver más"
          lessText="Ver menos"
        />
      </Box>
    </Box>
    <Box style={{ marginRight: '20px' }}>
      <Text size="small">{dateToPrint(item.createdAt)}</Text>
    </Box>
  </Box>
);

export default Notification;
