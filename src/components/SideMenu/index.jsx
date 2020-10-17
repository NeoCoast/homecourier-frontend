import {
  Accordion, AccordionPanel, Anchor, Box, Heading, Layer, Text, ThemeContext, Button,
} from 'grommet';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Package, FormNext, Close } from 'grommet-icons';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'Data/constants';
import PropTypes from 'prop-types';

const SideMenu = ({ onClose }) => {
  const userData = useSelector((state) => state.logUser.data);
  const [activeIndex, setActiveIndex] = useState(0);
  const history = useHistory();

  return (
    <ThemeContext.Extend value={{ layer: { border: { radius: '0px' } } }}>
      <Layer full="vertical" position="left" onEsc={onClose} onClickOutside={onClose}>
        <Box pad="medium">
          <Box direction="row" justify="between" fill="horizontal">
            <Heading level="5">Menu</Heading>
            <Button icon={<Close />} margin="small" onClick={onClose} />
          </Box>
          <Accordion multiple activeIndex={activeIndex} onActive={(newIndex) => setActiveIndex(newIndex)}>
            <AccordionPanel
              label={
                (
                  <Box direction="row" gap="small">
                    <Package />
                    <Text size="large">Pedidos</Text>
                  </Box>
                )
              }
            >
              {userData.documentNumber
                && (
                  <Anchor
                    icon={<FormNext />}
                    label="Ver Pedidos"
                    margin="small"
                    onClick={() => {
                      history.push(ROUTES.orders);
                      onClose();
                    }}
                  />
                )}

              <Anchor
                icon={<FormNext />}
                label="Mis Pedidos"
                margin="small"
                onClick={() => {
                  history.push(ROUTES.myOrders);
                  onClose();
                }}
              />

            </AccordionPanel>
          </Accordion>
        </Box>
      </Layer>
    </ThemeContext.Extend>
  );
};

SideMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default SideMenu;
