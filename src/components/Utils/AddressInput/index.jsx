import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const AddressInput = ({
  onChange, name, countries, ariaLabel,
}) => (
  <Box>
    <GooglePlacesAutocomplete
      apiKey={`${process.env.GOOGLE_MAPS_API_KEY}`}
      selectProps={{
        onChange,
        name,
        'aria-label': ariaLabel,
      }}
      debounce={1000}
      minLengthAutocomplete={5}
      autocompletionRequest={{
        componentRestrictions: {
          country: countries,
        },
      }}
    />
  </Box>
);

AddressInput.propTypes = {
  name: PropTypes.string.isRequired,
  countries: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

AddressInput.defaultProps = {
  countries: ['uy'],
};

export default AddressInput;
