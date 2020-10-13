import React from 'react';
import Rating from 'Components/Rating';
import { Box } from 'grommet';
import { useSelector } from 'react-redux';
import ratingService from 'Api/rating.service';
import PropTypes from 'prop-types';

const RateOrder = (props) => {
  const {
    orderId,
    show,
    setShow,
  } = props;
  const isHelpee = (undefined === useSelector((state) => state.logUser.document_number));

  const rate = (info) => {
    const ratingData = info;
    ratingData.orderId = orderId;
    ratingData.isHelpee = isHelpee;
    console.log(ratingData);
    ratingService.rateFromOrder(ratingData);
  };

  return (
    <Box>
      <Rating onSubmit={rate} show={show} setShow={setShow} />
    </Box>
  );
};

RateOrder.propTypes = {
  orderId: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default RateOrder;
