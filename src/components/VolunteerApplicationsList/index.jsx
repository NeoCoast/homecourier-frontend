import React, { useState, useEffect } from 'react';
import {
  Box, InfiniteScroll, Text, Button, Heading,
} from 'grommet';
import { Alert } from 'grommet-icons';
import Spinner from 'Components/Utils/Spinner';
import UserProfileInfo from 'Components/Utils/UserProfileInfo';
import PropTypes from 'prop-types';
import orderServices from 'Api/orders.service';
import ErrorModal from 'Components/Modals/ErrorModal';
import SuccessModal from 'Components/Modals/SuccessModal';

const VolunteerApplicationsList = ({ orderId }) => {
  const [volunteerApplications, setVolunteerApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccesMsg] = useState('');

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
      style={{
        minWidth: '300px',
      }}
    >
      {invalid && <ErrorModal errorMessage={errorMsg} setShow={setInvalid} show={invalid} />}
      {success && <SuccessModal setShow={setSuccess} show={setSuccess} message={successMsg} />}
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
              margin={{ bottom: 'medium' }}
            >
              Lista de postulaciones
            </Heading>
          </Box>
          <Box
            overflow={{ horizontal: 'hidden', vertical: 'auto' }}
            style={{
              paddingRight: '10px',
            }}
          >
            <InfiniteScroll
              items={volunteerApplications}
            >
              {(item, index) => (
                <Box
                  key={index}
                  border={{
                    side: 'bottom',
                    color: 'dark-4',
                    size: 'xsmall',
                  }}
                  style={{
                    minHeight: '150px',
                  }}
                  pad="small"
                  margin="5px"
                >
                  <Box>
                    <UserProfileInfo
                      style={{
                        flex: '1 1 0',
                      }}
                      user={item}
                    />
                  </Box>

                  <Box>
                    <Button
                      style={{
                        marginBottom: '10px',
                      }}
                      primary
                      label="Aceptar"
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
};

export default VolunteerApplicationsList;
