import React from 'react';
import {
  Card, CardHeader, CardFooter, CardBody, Heading, Button, Box, Paragraph,
} from 'grommet';
import { Add } from 'grommet-icons';
import PropTypes from 'prop-types';
import UserProfileInfo from 'Components/Utils/UserProfileInfo';
import ChipContainer from 'Components/Utils/ChipContainer';

const OrderCard = ({ order, viewportSize, openModal }) => (
  <Card style={{ maxHeight: '700px' }} background="white" elevation="xlarge" margin={{ horizontal: 'small', bottom: 'large' }}>
    <CardHeader pad={{ horizontal: 'xlarge', top: 'medium', bottom: 'medium' }}>
      <Heading level="4" margin="none">
        {order.title}
      </Heading>
    </CardHeader>
    <CardBody pad={{ horizontal: 'large' }}>
      <Box gap="small" fill>
        <Box direction="row-responsive" gap="small">
          <UserProfileInfo user={order.helpee} />
          <Box>
            <Heading level="5" margin={{ top: 'small', bottom: 'xsmall' }}>Descripción</Heading>
            <Paragraph margin="xsmall" size="small">
              {order.description}
            </Paragraph>
          </Box>
        </Box>
        <ChipContainer items={order.categories} label="description" />
      </Box>
    </CardBody>
    <CardFooter justify="end" pad={{ horizontal: 'large', top: 'small', bottom: 'medium' }}>
      <Button
        primary
        icon={<Add color="white" size={viewportSize === 'small' ? 'small' : 'medium'} />}
        size={viewportSize === 'small' ? 'small' : 'medium'}
        label="Ver más"
        reverse
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
