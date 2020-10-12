/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import {
  Box, Layer, Button, TextArea, Heading, Stack,
} from 'grommet';
import { StatusGoodSmall, Fireball } from 'grommet-icons';
import Spinner from 'Components/Utils/Spinner';
import PropTypes from 'prop-types';
import ErrorModal from 'Components/Modals/ErrorModal';

const Rating = (props) => {
  const {
    stars,
    title,
    description,
    buttonLabel,
    onSubmit,
    errorMessageComment,
    errorMessageRating,
  } = props;

  const [show, setShow] = useState(false);
  const starsElement = [];
  const [active, setActive] = useState(-1);
  const [feedBack, setFeedBack] = useState('');
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (active < 0 || (active < stars / 2 && !feedBack)) {
      setInvalid(true);
      active < 0 ? setError(errorMessageRating) : setError(errorMessageComment);
    } else {
      setLoading(true);
      const info = {
        score: active,
        comment: feedBack,
      };
      await onSubmit(info);
      setLoading(false);
      setActive(-1);
      setShow(false);
    }
  };

  for (let i = 0; i < stars; i++) {
    starsElement.push(
      <Stack
        key={i}
        alignSelf="center"
        onClick={() => setActive(i)}
      >
        {active >= i && (
          <StatusGoodSmall
            size="large"
            color="#f2da81"
          />
        )}
        <Fireball
          size="large"
          color="black"
        />
      </Stack>
    );
  }
  return (
    <Box>
      {invalid && <ErrorModal errorMessage={error} setShow={setInvalid} show={invalid} />}
      {!show
        && (<Button label={buttonLabel} onClick={() => setShow(true)} />)}
      { show && !invalid
          && (
            <Layer margin="large" position="center" modal={false} responsive={false}>
              <Heading margin="small" level={2} alignSelf="center">{ title }</Heading>
              <Box
                justify="center"
                alignSelf="center"
                direction="row"
                gap="medium"
                margin="small"
              >
                { starsElement }
              </Box>
              <Box align="center" pad="medium">
                <TextArea
                  size="medium"
                  placeholder={description}
                  onChange={(event) => setFeedBack(event.target.value)}
                />
              </Box>
              <Button
                margin="small"
                label={buttonLabel}
                onClick={handleSubmit}
              />
            </Layer>
          )}
      {loading && <Spinner />}
    </Box>
  );
};

Rating.propTypes = {
  stars: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonLabel: PropTypes.string,
  errorMessageComment: PropTypes.string,
  errorMessageRating: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

Rating.defaultProps = {
  stars: 5,
  title: 'Califique al voluntario',
  description: 'Por favor, haga un comentario sobre su experiencia',
  buttonLabel: 'Calificar',
  errorMessageRating: 'Debe calificar al voluntario antes de continuar.',
  errorMessageComment: 'Por favor, de un comentario sobre que le incomodo de su experiencia',
};

export default Rating;
