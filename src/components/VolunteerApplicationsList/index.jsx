import React, { useState, useEffect, useContext } from 'react';
import {
  Box, InfiniteScroll, Text, Button, Heading, ResponsiveContext,
} from 'grommet';
import { Alert } from 'grommet-icons';
import Spinner from 'Components/Utils/Spinner';
import UserProfileInfo from 'Components/Utils/UserProfileInfo';
import PropTypes from 'prop-types';
import orderServices from 'Api/orders.service';
import ErrorModal from 'Components/Modals/ErrorModal';
import SuccessModal from 'Components/Modals/SuccessModal';

const VolunteerApplicationsList = ({ orderId, onClose }) => {
  const [volunteerApplications, setVolunteerApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccesMsg] = useState('');
  const viewPortSize = useContext(ResponsiveContext);

  useEffect(() => {
    const fetchVolunteerApplications = async () => {
      try {
        setLoading(true);
        const response = await orderServices.getApplicationsList(orderId);
        setVolunteerApplications(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrorMsg('Se ha producido un error al listar las postulaciones');
        setInvalid(true);
        console.error('error: ', error);
      }
    };
    fetchVolunteerApplications();
  }, []);

  const onAccept = async (volunteerId) => {
    try {
      setLoading(true);
      await orderServices.acceptVolunteerForOrder(orderId, volunteerId);
      setSuccesMsg('El voluntario ha sido aceptado');
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMsg('Se ha producido un error al aceptar al voluntario');
      setInvalid(true);
      console.error('error: ', error);
    }
  };

  return (
    <Box
      background="white"
      fill="horizontal"
    >
      {invalid && <ErrorModal errorMessage={errorMsg} setShow={setInvalid} show={invalid} />}
      {success && <SuccessModal setShow={setSuccess} show={setSuccess} message={successMsg} aditionalClose={onClose} />}
      { loading && <Spinner />}
      { !loading && volunteerApplications != null && volunteerApplications.length > 0 && (
        <Box
          basis="full"
        >
          <Box
            pad={{ bottom: 'medium' }}
          >
            <Heading
              level="4"
              margin={{ bottom: 'medium', top: 'small' }}
            >
              Lista de postulaciones
            </Heading>
          </Box>
          <Box
            overflow="auto"
            height={viewPortSize === 'small' ? '30vh' : '100%'}
          >
            <InfiniteScroll
              items={volunteerApplications}
            >
              {(item, index) => (
                <Box
                  direction="row-responsive"
                  key={index}
                  border={{
                    side: 'bottom',
                    color: 'dark-4',
                    size: 'xsmall',
                  }}
                  style={{ minHeight: viewPortSize === 'small' ? '150px' : 0 }}
                  pad="small"
                  margin="5px"
                  gap={viewPortSize !== 'small' ? 'medium' : 'small'}
                >
                  <UserProfileInfo
                    user={item}
                  />
                  <Box style={{ minWidth: viewPortSize !== 'small' ? '95px' : 0 }}>
                    <Button
                      primary
                      label="Aceptar"
                      size="small"
                      margin={viewPortSize !== 'small' && { vertical: 'medium' }}
                      onClick={(event) => {
                        event.preventDefault();
                        onAccept(item.id);
                      }}
                    />
                  </Box>

                </Box>
              )}
            </InfiniteScroll>
          </Box>
        </Box>
      )}
      { !loading && volunteerApplications != null && volunteerApplications.length === 0 && (
        <Box
          pad="small"
          direction="row"
          gap="small"
        >
          <Alert
            color="gray"
          />
          <Text>
            Aún no hay postulaciones de voluntarios para tomar el pedido
          </Text>
        </Box>
      )}
    </Box>
  );
};

VolunteerApplicationsList.propTypes = {
  orderId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VolunteerApplicationsList;
