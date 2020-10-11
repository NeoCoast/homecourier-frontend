/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import {
  Box, Layer, Button, TextArea, Heading, Stack,
} from 'grommet';
import { StatusGoodSmall, Fireball } from 'grommet-icons';
import Spinner from 'Components/Utils/Spinner';
import PropTypes from 'prop-types';

const Rating = (props) => {
  const { stars } = props;
  const { title } = props;
  const { description } = props;
  const { buttonLabel } = props;
  const { onSubmit } = props;
  const [show, setShow] = useState(false);
  const starsElement = [];
  const [active, setActive] = useState(-1);
  const [feedBack, setFeedBack] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit();
    setLoading(false);
    setActive(-1);
    setShow(false);
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
      {!show
        && (<Button label={buttonLabel} onClick={() => setShow(true)} />)}
      { show
          && (
            <Layer margin="large" position="center" modal={false} responsive={false}>
              <Heading margin="small" level={2} alignSelf="center">{ title }</Heading>
              <Box
                justify="center"
                alignSelf="center"
                direction="row"
                gap="medium"
                margin="medium"
              >
                { starsElement }
              </Box>
              { active >= 0 && active <= (stars / 2) && (
                <TextArea
                  size="large"
                  margin="large"
                  justify="center"
                  alignSelf="center"
                  placeholder={description}
                  onChange={(event) => setFeedBack(event.target.value)}
                />
              )}
              <Button
                margin="medium"
                disabled={(active < 0) || ((active < (stars / 2)) && (!feedBack))}
                label="Votar"
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
  onSubmit: PropTypes.func.isRequired,
};

Rating.defaultProps = {
  stars: 5,
  title: 'Califique al voluntario',
  description: 'Por favor, indique por que su atención no fue satisfactoria',
  buttonLabel: 'rate',
};

export default Rating;
