import React, { useState } from 'react';
import './index.scss';
import Modal from 'react-modal';
import {
  Box, Heading, Button, Text, Grid, Table, TableBody, TableHeader, TableCell, TableRow,
} from 'grommet';
import ordersService from 'Api/orders.service';
import { useSelector } from 'react-redux';

const OrdersList = ({ orders }) => {
  const takeOrder = async (id) => {
    try {
      await ordersService.take({
        volunteerId,
        id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const volunteerId = useSelector((state) => state.logUser.data.id);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (id, username, title, description, categories, address) => {
    setIsOpen(true);
    setOrder({
      ...order, orderId: id, username, title, description, categories, address,
    });
  };

  const [order, setOrder] = useState({
    orderId: '',
    title: '',
    description: '',
    categories: [],
    username: '',
    address: '',
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyle = {
    content: {
      top: '8%',
      left: '25%',
      right: '25%',
      bottom: 'auto',
    },
  };

  return (
    <Box background="white">

      <Grid
        rows={['fill']}
        columns={['fill']}
        areas={[
          { name: 'main', start: [0, 0], end: [0, 0] },
        ]}
        background="white"
      >

        <Box gridArea="main" background="white">

          <Table id="tableOrders">
            <TableHeader>
              <TableRow>
                <TableCell scope="col" border="bottom">
                  Usuario
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Título
                </TableCell>
                <TableCell scope="col" id="desc" border="bottom">
                  Descripción
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Categorías
                </TableCell>
                <TableCell scope="col" border="bottom">

                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((item, index) => (
                <TableRow key={index}>
                  {item.status === 'created' ? <TableCell size="xsmall" scope="row"><strong>{item.helpee.name} {item.helpee.lastname}</strong></TableCell> : null}
                  {item.status === 'created' ? <TableCell size="xsmall" scope="row"><strong>{item.title}</strong></TableCell> : null}
                  {item.status === 'created' ? <TableCell size="xsmall" scope="row">{item.description}</TableCell> : null}
                  {item.status === 'created' ? (
                    <TableCell size="xsmall" scope="row">
                      {item.categories.map((cat) => (

                        <Box round="large" background="accent-1" pad="xxsmall" margin={{ top: 'xsmall' }} style={{ textAlign: 'center' }}> {cat.description} </Box>

                      ))}
                    </TableCell>
                  ) : null}
                  {item.status === 'created' ? (
                    <TableCell size="xsmall" scope="row">
                      <Button primary label="ver más" onClick={() => openModal(item.id, item.helpee.username, item.title, item.description, item.categories, item.helpee.address)} />
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </Box>
      </Grid>

      <Modal
        isOpen={modalIsOpen}
        style={customStyle}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <Heading level="2">{order.title}</Heading>

        <Box> <Heading level="3"> Usuario </Heading>
          {order.username}
        </Box>

        <Box> <Heading level="3"> Categorías </Heading>
          {order.categories.map((cat) => (
            <Box> <Text> {cat.description} </Text> </Box>
          ))}
        </Box>

        <Box> <Heading level="3"> Descripción </Heading>
          {order.description}
        </Box>

        <Box> <Heading level="3"> Dirección </Heading>
          {order.address}
        </Box>

        <Box direction="row" id="buttonsmodal">
          <Button onClick={closeModal} label="Cancelar" />
          <Button id="buttontomar" onClick={() => takeOrder(order.orderId)} primary label="Tomar pedido" />
        </Box>

      </Modal>

    </Box>
  );
};

export default OrdersList;
