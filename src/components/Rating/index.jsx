/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import {
  Box, Layer, Button, TextArea, Heading, Stack, FormField, Form, Text, ResponsiveContext,
} from 'grommet';
import { StatusGoodSmall, Fireball } from 'grommet-icons';
import Spinner from 'Components/Utils/Spinner';
import PropTypes from 'prop-types';
import ErrorModal from 'Components/Modals/ErrorModal';
import SuccessModal from 'Components/Modals/SuccessModal';

const Rating = (props) => {
  const {
    stars,
    title,
    description,
    buttonLabel,
    onSubmit,
    errorMessageComment,
    errorMessageRating,
    successMessage,
    setShow,
    show,
  } = props;

  const starsElement = [];
  const [active, setActive] = useState(-1);
  const [feedBack, setFeedBack] = useState('');
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const errorMessage = (msg) => (
    <Text size="small" color="red">
      {msg}
    </Text>
  );

  const validateComment = (value) => {
    if ((active < stars / 2) && !value) {
      return { status: 'error', message: errorMessage(errorMessageComment) };
    }
    return { status: 'info' };
  };

  const handleSubmit = async () => {
    if (active < 0) {
      setInvalid(true);
      setError(errorMessageRating);
    } else {
      setLoading(true);
      const info = {
        score: active + 1,
        comment: feedBack,
      };
      try {
        await onSubmit(info);
        setLoading(false);
        setActive(-1);
        setShow(false);
        setSuccess(true);
      } catch (failure) {
        setLoading(false);
        setError(failure);
        setInvalid(true);
        console.log(failure);
      }
    }
  };

  const deviceSize = React.useContext(ResponsiveContext);

  for (let i = 0; i < stars; i++) {
    starsElement.push(
      <Stack
        key={i}
        alignSelf="center"
        onClick={() => setActive(i)}
      >
        {active >= i && (
          <StatusGoodSmall
            size={deviceSize === 'small' ? 'medium' : 'large'}
            color="#f2da81"
          />
        )}
        <Fireball
          size={deviceSize === 'small' ? 'medium' : 'large'}
          color="black"
        />
      </Stack>
    );
  }
  return (
    <Box>
      {loading && <Spinner />}
      {invalid && <ErrorModal errorMessage={error} setShow={setInvalid} show={invalid} />}
      {success && <SuccessModal message={successMessage} setShow={setSuccess} show={success} />}
      { show && !invalid
        && (
          <Layer
            margin="large"
            position="center"
            modal
            responsive={false}
            style={
              {
                minWidth: '300px',
                maxHeigh: '90%',
                padding: '10px',
              }
            }
          >
            <Form
              onSubmit={handleSubmit}
            >
              <Heading margin="medium" style={{ fontSize: deviceSize === 'small' ? '1.3rem' : '2rem' }} textAlign="center">{title}</Heading>
              <Box
                fill="horizontal"
                justify="center"
                alignSelf="center"
                direction="row"
                gap="medium"
              >
                {starsElement}
              </Box>
              <Box align="center" pad="medium">
                <FormField
                  size="medium"
                  label="Comentario"
                  htmlFor="Comment"
                  name="Comment"
                  validate={(value) => validateComment(value)}
                  fill
                >
                  <TextArea
                    size="medium"
                    id="Comment"
                    name="Comment"
                    resize={false}
                    placeholder={description}
                    onChange={(event) => setFeedBack(event.target.value)}
                  />
                </FormField>
              </Box>
              <Box align="center" pad="medium">
                <Button
                  fill="horizontal"
                  primary
                  type="submit"
                  label={buttonLabel}
                />
              </Box>
            </Form>
          </Layer>
        )}
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
  successMessage: PropTypes.string,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

Rating.defaultProps = {
  stars: 5,
  title: 'Califique al voluntario',
  description: 'Por favor, haga un comentario sobre su experiencia.',
  buttonLabel: 'Calificar',
  errorMessageRating: 'Debe calificar al voluntario antes de continuar.',
  errorMessageComment: 'Por favor, deje un comentario de lo que no fue de su agrado.',
  successMessage: 'Ha calificado con éxito. Gracias!',
};

export default Rating;
