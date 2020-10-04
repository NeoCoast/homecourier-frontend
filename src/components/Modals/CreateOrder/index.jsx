import React, { useState, useEffect } from 'react';
import {
  Box, Button, TextArea, Heading, Layer, TextInput,
} from 'grommet';
import Select from 'react-select';
import { notifySuccess, notifyError } from 'Helpers/toast.helper';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ordersService from 'Api/orders.service';
import categoriesService from 'Api/categories.service';
import Spinner from 'Components/Utils/Spinner';
import ErrorModal from 'Components/Modals/ErrorModal';
import 'react-toastify/dist/ReactToastify.css';

const CreateOrder = () => {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
      notifyError(error);
    }
    setOptions(opts);
  };

  const newOrder = async () => {
    let errorFlag = false;
    if (categories.length === 0) {
      notifyError('Debe seleccionar al menos una categoría');
      errorFlag = true;
    }
    if (!description) {
      notifyError('Descripción es obligatoria');
      errorFlag = true;
    }
    if (!errorFlag) {
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
        setErrorMessage('Ocurrío un error intentando comunicarse con el servidor');
        errorFlag = true;
      }
    }
    if (!errorFlag) {
      setLoading(false);
      notifySuccess('Su pedido fue registrado con exito');
      closeModal();
    }
  };

  const openModal = () => {
    // Set an empty title
    setTitle('');
    // Set an empty description
    setDescription('');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    // Set an empty title
    setTitle('');
    // Set an empty description
    setDescription('');
    setModalIsOpen(false);
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
  }, []);

  return (
    <div>
      <Button disabled={loading} primary onClick={openModal} label="Nuevo Pedido" />
      {modalIsOpen && (
        <Layer>
          <Box
            align="center"
            elevation="medium"
            pad="large"
            gap="medium"
            round="5px"
            direction="column"
            background="white"
          >
            <Heading level="2">Crear un pedido</Heading>
            <Box id="boxTitle" fill="horizontal">
              <Heading level="3">Título</Heading>
              <TextInput id="title" placeholder="Ingrese el título" value={title} onChange={(event) => setTitle(event.target.value)} />
            </Box>
            <Box id="boxCategories" fill="horizontal">
              <Heading level="3">Categorías</Heading>
              <Select isMulti id="categories" options={options} onChange={handleChange} width="fill" />
            </Box>
            <Box id="boxDescription" fill="horizontal">
              <Heading level="3">Descripción</Heading>
              <TextArea
                id="description"
                placeholder="Ingrese la descripción"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                width="100%"
              />
            </Box>
            <Box direction="row-responsive" gap="medium" justify="end">
              <Button label="Cancelar" onClick={closeModal} />
              <Button primary label="Crear" onClick={newOrder} />
            </Box>
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
      )}
    </div>
  );
};

export default CreateOrder;