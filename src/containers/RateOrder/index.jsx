import React from 'react';
import Rating from 'Components/Rating';
import { Box } from 'grommet';
import { useSelector } from 'react-redux';
import ratingService from 'Api/rating.service';
import PropTypes from 'prop-types';

const RateOrder = (props) => {
  const {
    orderId,
    stars,
    title,
    description,
    buttonLabel,
    errorMessageComment,
    errorMessageRating,
    successMessage,
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
      <Rating
        onSubmit={rate}
        show={show}
        setShow={setShow}
        stars={stars}
        title={title}
        description={description}
        buttonLabel={buttonLabel}
        errorMessageComment={errorMessageComment}
        errorMessageRating={errorMessageRating}
        successMessage={successMessage}
      />
    </Box>
  );
};

RateOrder.propTypes = {
  orderId: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  stars: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonLabel: PropTypes.string,
  errorMessageComment: PropTypes.string,
  errorMessageRating: PropTypes.string,
  successMessage: PropTypes.string,
};

RateOrder.defaultProps = {
  stars: 5,
  title: 'Califique al voluntario',
  description: 'Por favor, haga un comentario sobre su experiencia',
  buttonLabel: 'Calificar',
  errorMessageRating: 'Debe calificar al voluntario antes de continuar.',
  errorMessageComment: 'Por favor, de un comentario sobre que no fue de su agrado en su experiencia',
  successMessage: 'Ha calificado con éxito. Gracias!',
};

export default RateOrder;
