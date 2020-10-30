/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import {
  Box, Layer, Button, TextArea, Heading, Stack, ResponsiveContext, Form, FormField, Text,
} from 'grommet';
import { StatusGoodSmall, Fireball } from 'grommet-icons';
import Spinner from 'Components/Utils/Spinner';
import PropTypes from 'prop-types';
import SuccessModal from 'Components/Modals/SuccessModal';
import { validateComment } from 'Helpers/validator.helper';

const Rating = (props) => {
  const {
    stars,
    title,
    description,
    buttonLabel,
    onSubmit,
    errorMessageComment,
    successMessage,
    setShow,
    show,
  } = props;

  // const [show, setShow] = useState(false);
  const starsElement = [];
  const [active, setActive] = useState(-1);
  const [feedBack, setFeedBack] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const gapSize = React.useContext(ResponsiveContext);
  const [iconSize, setIconSize] = useState('large');
  const [headingSize, setHeadingSize] = useState(2);

  const errorMessage = () => (
    <Text size="small" color="red">
      {errorMessageComment}
    </Text>
  );

  useEffect(() => {
    if (gapSize === 'small') {
      setIconSize('medium');
      setHeadingSize(5);
    } else {
      setIconSize('large');
      setHeadingSize(2);
    }
  }, [gapSize]);

  const handleSubmit = async () => {
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
      console.log(failure);
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
            size={iconSize}
            color="#f2da81"
          />
        )}
        <Fireball
          size={iconSize}
          color="black"
        />
      </Stack>
    );
  }
  return (
    <Box responsive={false}>
      {loading && <Spinner />}
      {success && <SuccessModal message={successMessage} setShow={setSuccess} show={success} />}
      { show
          && (
            <Layer margin="medium" position="center" modal responsive={false}>
              <Heading margin="small" level={headingSize} alignSelf="center">{ title }</Heading>
              <Box
                justify="center"
                alignSelf="center"
                direction="row"
                gap={gapSize}
                margin="xsmall"
                responsive={false}
                style={
                  {
                    minWidth: '300px',
                    maxHeigh: '90%',
                    padding: '10px',
                  }
                }
              >
                { starsElement }
              </Box>
              <Form onSubmit={handleSubmit}>
                <Box pad="small">
                  <FormField name="Comment" validate={(value) => validateComment(value, (active >= Math.floor(stars / 2)), errorMessage)}>
                    <Box align="center" height="small">
                      <TextArea
                        name="Comment"
                        id="Comment"
                        size="medium"
                        resize={false}
                        fill
                        placeholder={description}
                        onChange={(event) => setFeedBack(event.target.value)}
                      />
                    </Box>
                  </FormField>
                </Box>
                <Box pad="small">
                  <Button
                    primary
                    disabled={active < 0}
                    fill="horizontal"
                    label={buttonLabel}
                    type="submit"
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
  onSubmit: PropTypes.func.isRequired,
  successMessage: PropTypes.string,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

Rating.defaultProps = {
  stars: 5,
  title: 'Califique al voluntario',
  description: 'Por favor, haga un comentario sobre su experiencia',
  buttonLabel: 'Calificar',
  errorMessageComment: 'Por favor, de un comentario sobre que no fue de su agrado en su experiencia',
  successMessage: 'Ha calificado con éxito. ¡Gracias!',
};

export default Rating;
