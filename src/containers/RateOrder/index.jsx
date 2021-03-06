import React from 'react';
import Rating from 'Components/Rating';
import { Box } from 'grommet';
import { useSelector, useDispatch } from 'react-redux';
import ratingService from 'Api/rating.service';
import PropTypes from 'prop-types';
import { login } from 'Actions/logUser';

const RateOrder = (props) => {
  const {
    orderId,
    stars,
    description,
    buttonLabel,
    errorMessageComment,
    successMessage,
    show,
    setShow,
    username,
  } = props;
  const dispatch = useDispatch();
  const isHelpee = undefined === useSelector((state) => state.logUser.data.documentNumber);
  const user = useSelector((state) => state.logUser.data);

  const rate = async (info) => {
    const ratingData = info;
    ratingData.order_id = orderId;
    if (!isHelpee) {
      ratingService.rateVolunteer(ratingData);
    } else {
      ratingService.rateHelpee(ratingData);
    }

    const userData = JSON.parse(JSON.stringify(user));
    userData.pendings.splice(0, 1);
    await dispatch(login(userData));
  };

  return (
    <Box>
      {isHelpee && (
        <Rating
          onSubmit={rate}
          show={show}
          setShow={setShow}
          stars={stars}
          title="Califique al voluntario"
          description={description}
          buttonLabel={buttonLabel}
          errorMessageComment={errorMessageComment}
          errorMessageRating="Debe calificar al voluntario antes de continuar."
          successMessage={successMessage}
          username={username}
        />
      )} {console.log('errorMessageComment: ', errorMessageComment)}
      {!isHelpee && (
        <Rating
          onSubmit={rate}
          show={show}
          setShow={setShow}
          stars={stars}
          title="Califique al usuario"
          description={description}
          buttonLabel={buttonLabel}
          errorMessageComment={errorMessageComment}
          errorMessageRating="Debe calificar al usuario antes de continuar."
          successMessage={successMessage}
          username={username}
        />
      )}
    </Box>
  );
};

RateOrder.propTypes = {
  orderId: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  stars: PropTypes.number,
  description: PropTypes.string,
  buttonLabel: PropTypes.string,
  errorMessageComment: PropTypes.string,
  successMessage: PropTypes.string,
  username: PropTypes.string,
};

RateOrder.defaultProps = {
  stars: 5,
  description: 'Por favor, haga un comentario sobre su experiencia.',
  buttonLabel: 'Calificar',
  errorMessageComment: 'Por favor, dé un comentario sobre qué no fue de su agrado.',
  successMessage: 'Ha calificado con éxito. ¡Gracias!',
  username: '',
};

export default RateOrder;
