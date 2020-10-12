import React from 'react';
import Rating from 'Components/Rating';
import { Box } from 'grommet';
import { useSelector } from 'react-redux';
import ratingService from 'Api/rating.service';

const RateOrder = () => {
  const orderId = useSelector((state) => state.logUser.orderId);
  const isHelpee = (undefined === useSelector((state) => state.logUser.document));
  const rate = (info) => {
    const ratingData = info;
    ratingData.orderId = orderId;
    ratingData.isHelpee = isHelpee;
    console.log(ratingData);
    ratingService.rateFromOrder(ratingData);
  };

  return (
    <Box>
      <Rating onSubmit={rate} />
    </Box>
  );
};

export default RateOrder;
