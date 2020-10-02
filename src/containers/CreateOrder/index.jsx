import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {
  Box, Button, TextArea,
} from 'grommet';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'Data/constants';
import ordersService from '../../api/orders.service';
import categoriesService from '../../api/categories.service';
import 'react-toastify/dist/ReactToastify.css';

const CreateOrder = () => {
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const userToken = useSelector((state) => state.logUser.data.token);
  const userLoggedIn = useSelector((state) => state.logUser.isLogged);
  const history = useHistory();

  if (!userLoggedIn) {
    history.push('/login');
  }

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
    const title = 'Titulo del pedido';
    const helpeeId = 1;
    if (categories.length === 0) {
      notifyError('Debe seleccionar al menos una categoría');
      errorFlag = true;
    }
    if (!description) {
      notifyError('Descripción es obligatoria');
      errorFlag = true;
    }
    if (!errorFlag) {
      notifySuccess('Su pedido fue registrado con exito');
    }
    try {
      await ordersService.create({
        title,
        helpeeId,
        categories,
        description,
      });
    } catch (error) {
      notifyError(error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (selectedOptions) => {
    if (selectedOptions) {
      setCategories(Array.from(selectedOptions, (option) => ({ id: option.value })));
    } else {
      setCategories([]);
    }
  };

  const customStyle = {
    content: {
      top: '10%',
      left: '25%',
      right: '25%',
      bottom: 'auto',
    },
  };

  const notifyError = (errorMsg) => toast.error(errorMsg);

  const notifySuccess = (successMsg) => toast.success(successMsg);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <div>
        <Button justify="end" onClick={openModal}>+</Button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyle}
        onRequestClose={closeModal}
        ariaHideApp={false} // missing app appElement
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Box align="center" pad="large" gap="small" direction="column" fill="horizontal">
          <h3>Crear un pedido</h3>
          <Box id="boxCategories" fill="horizontal">
            <h4>Categorías</h4>
            <Select isMulti id="categories" options={options} onChange={handleChange} width="fill" />
          </Box>
          <Box id="boxDescription" fill="horizontal">
            <h4>Descripción</h4>
            <TextArea id="description" placeholder="Ingrese la descripción" value={description} onChange={(event) => setDescription(event.target.value)} required width="100%" />
          </Box>
          <Box direction="row-responsive" gap="medium" justify="end">
            <Button label="Cancelar" onClick={closeModal} />
            <Button primary label="Crear" onClick={newOrder} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateOrder;
