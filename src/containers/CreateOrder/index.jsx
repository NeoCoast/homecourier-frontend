import React, { useState } from 'react';
import Modal from 'react-modal';
import {
  Box, Button, TextArea,
} from 'grommet';
import Select from 'react-select';

const InitialList = [];

/*
  TODO Check if user is logged in
  TODO Check if categories and description aren't empty attributes
*/

const CreateOrder = () => {
  const [categories, setCategories] = useState(InitialList);
  const [description, setDescription] = useState('');

  const newOrder = async () => {
    console.log(categories);
    console.log(description);
    // try {
    //   await ordersService.create({
    //     title,
    //     categories,
    //     description,
    //   });
    // } catch (error) {
    //   alert('error: ', error);
    // }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const options = [
    { value: 'farmacia', label: 'Farmacia' },
    { value: 'supermercado', label: 'Supermercado' },
    { value: 'cobranza', label: 'Cobranza' },
  ];

  const handleChange = (selectedOptions) => {
    if (selectedOptions) {
      setCategories(Array.from(selectedOptions, (option) => option.value));
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

  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <Button justify="end" onClick={openModal}>+</Button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyle}
        onRequestClose={closeModal}
      >
        <Box align="center" pad="large" gap="small" direction="column" fill="horizontal">
          <h3>Crear un pedido</h3>
          <Box fill="horizontal">
            <h4>Categorías</h4>
            <Select isMulti id="categories" options={options} onChange={handleChange} width="fill" />
          </Box>
          <Box fill="horizontal">
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
