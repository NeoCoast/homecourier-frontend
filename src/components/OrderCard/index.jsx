import React from 'react';
import {
  Card, CardHeader, CardFooter, CardBody, Heading, Button, Box, Text,
} from 'grommet';
import PropTypes from 'prop-types';
import UserProfileInfo from 'Components/Utils/UserProfileInfo';
import ChipContainer from 'Components/Utils/ChipContainer';

const OrderCard = ({ order, viewportSize, openModal }) => (
  <Card style={{ maxHeight: '620px', minHeight: '300px' }}>
    <CardHeader pad={{ horizontal: 'xlarge', top: 'large', bottom: 'medium' }}>
      <Heading level="4" margin="none">
        {order.title}
      </Heading>
    </CardHeader>
    <CardBody pad={{ horizontal: 'xlarge' }}>
      <Box gap="small">
        <UserProfileInfo user={order.helpee} />
        <ChipContainer items={order.categories} label="description" />
        <Text margin="none" size="small" truncate>
          {order.description}
        </Text>
      </Box>
    </CardBody>
    <CardFooter justify="end" pad={{ horizontal: 'xlarge', vertical: 'small' }}>
      <Button
        primary
        size={viewportSize === 'small' ? 'small' : 'medium'}
        label="Ver Mas"
        onClick={() => openModal(order)}
      />
    </CardFooter>
  </Card>
);

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  viewportSize: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
export default OrderCard;
