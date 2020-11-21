import React from 'react';
import {
  Card, CardHeader, CardFooter, CardBody, Heading, Button, Box,
} from 'grommet';
import { Add } from 'grommet-icons';
import PropTypes from 'prop-types';
import UserProfileInfo from 'Components/Utils/UserProfileInfo';
import ChipContainer from 'Components/Utils/ChipContainer';
import MiniStatusDisplay from 'Components/Utils/MiniStateDisplay';
import { useSelector } from 'react-redux';
import ClampLines from 'react-clamp-lines';
import { ORDER_STATUS_PHASE_NUMBER } from 'Data/constants';

const OrderCard = ({
  order, viewportSize, openModal,
}) => {
  const userData = useSelector((state) => state.logUser.data);

  return (
    <Card
      style={{ maxHeight: '700px', boxShadow: '0.5vh 0.5vh 10px #202020' }}
      background="white"
      elevation="xlarge"
      margin={{ horizontal: 'small', bottom: 'large' }}
    >
      <CardHeader pad={{ horizontal: 'large', top: 'medium', bottom: 'medium' }}>
        <Heading level="4" margin={{ horizontal: 'small' }}>
          <ClampLines
            className="ellipsis-class"
            text={`${order.title}`}
            lines={1}
            buttons
            moreText="Ver más"
            lessText="Ver menos"
          />
        </Heading>
      </CardHeader>
      <CardBody pad={{ horizontal: 'large' }}>
        <Box gap="small" fill>
          <Box direction="row-responsive" gap="small" justify="between">
            <Box fill>
              {userData.documentNumber && <UserProfileInfo user={order.helpee} />}
              {((order.volunteers ? (order.volunteers.map((x) => x.id).includes(userData.id) && order.status !== 'created') : false) || userData.id === order.helpee.id)
                && (
                  <MiniStatusDisplay activeStep={ORDER_STATUS_PHASE_NUMBER[order.status]} cancelled={order.status === 'cancelled'} />
                )}
            </Box>
            <div style={{ minWidth: '320px' }}>
              <Heading level="5" margin={{ top: '0', bottom: 'xsmall' }}>
                Descripción
              </Heading>
              <div style={{ maxWidth: '320px' }}>
                <ClampLines
                  className="ellipsis-class"
                  text={`${order.description}`}
                  lines={1}
                  buttons
                  moreText="Ver más"
                  lessText="Ver menos"
                />
              </div>
            </div>
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
};

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  viewportSize: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
export default OrderCard;
