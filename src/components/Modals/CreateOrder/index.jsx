import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, TextArea, Heading, Layer, TextInput, Form, FormField, Text, ResponsiveContext,
} from 'grommet';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ordersService from 'Api/orders.service';
import categoriesService from 'Api/categories.service';
import Spinner from 'Components/Utils/Spinner';
import ErrorModal from 'Components/Modals/ErrorModal';
import { validateTitle, validateSelect } from 'Helpers/validator.helper';

const CreateOrder = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([]);
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const userLoggedIn = useSelector((state) => state.logUser.loggedIn);
  const helpeeId = useSelector((state) => state.logUser.data.id);
  const history = useHistory();

  const getCategories = async () => {
    const opts = [];
    try {
      const categoriesJson = await categoriesService.getCategories();
      categoriesJson.forEach((opt) => {
        opts.push({
          value: opt.id,
          label: opt.description,
        });
      });
    } catch (error) {
      setInvalid(true);
      setErrorMessage('Ha ocurrido un error intentando comunicarse con el servidor');
    }
    setOptions(opts);
  };

  const errorMsg = (msgError) => (
    <Text size="small" color="red">
      {msgError}
    </Text>
  );

  const newOrder = async () => {
    let errorFlag = false;
    try {
      setLoading(true);
      await ordersService.create({
        title,
        helpeeId,
        categories,
        description,
      });
    } catch (error) {
      setLoading(false);
      setInvalid(true);
      setErrorMessage('Ocurrió un error intentando comunicarse con el servidor');
      errorFlag = true;
    }
    if (!errorFlag) {
      setLoading(false);
      closeModal();
    }
  };

  const handleChange = (selectedOptions) => {
    if (selectedOptions) {
      setCategories(Array.from(selectedOptions, (option) => ({ id: option.value })));
    } else {
      setCategories([]);
    }
  };

  useEffect(() => {
    if (!userLoggedIn) {
      history.push('/login');
    } else {
      getCategories();
    }
  }, [userLoggedIn]);

  return (
    <Layer
      position="center"
      margin="medium"
      responsive={false}
      onEsc={() => closeModal()}
      onClickOutside={() => closeModal()}
      fill="horizontal"
    >
      <Box
        align="center"
        round="5px"
        direction="column"
        background="white"
        pad="small"
        gap="small"
        responsive={false}
      >
        <Heading level={2} margin="none">Crear un pedido</Heading>
        <Form onSubmit={newOrder}>
          <Heading level={3} margin="none">Título</Heading>
          <FormField
            name="title"
            validate={(value) => validateTitle(value, errorMsg, 'El título es requerido', 'Titulo debe tener al menos 5 caracteres')}
          >
            <Box id="boxTitle" fill="horizontal">
              <TextInput
                id="title"
                name="title"
                placeholder="Ingrese el título"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Box>
          </FormField>
          <Heading level={3} margin="none">Categorías</Heading>
          <FormField name="categories" validate={() => validateSelect(categories, errorMsg, 'Debe seleccionar al menos una categoría')}>
            <Box id="boxCategories" fill="horizontal">
              <Select
                placeholder="Seleccione una.."
                isMulti
                id="categories"
                name="categories"
                options={options}
                onChange={handleChange}
                width="fill"
              />
            </Box>
          </FormField>
          <Heading level={3} margin="none">Descripción</Heading>
          <FormField
            name="description"
            validate={(value) => validateTitle(value, errorMsg, 'La descripción es requerida', 'La descripción debe tener al menos 5 caracteres')}
          >
            <Box height={React.useContext(ResponsiveContext) === 'small' ? 'xsmall' : 'small'} responsive={false} id="boxDescription">
              <TextArea
                id="description"
                name="description"
                fill
                resize={false}
                placeholder="Ingrese la descripción"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                width="100%"
              />
            </Box>
          </FormField>
          <Box direction="row-responsive" align="center">
            <Button primary fill type="submit" label="Crear" />
          </Box>
        </Form>
      </Box>
      {invalid
      && (
        <ErrorModal
          errorMessage={errorMessage}
          setShow={setInvalid}
          show={invalid}
        />
      )}
      {loading && <Spinner />}
    </Layer>
  );
};

CreateOrder.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CreateOrder;
