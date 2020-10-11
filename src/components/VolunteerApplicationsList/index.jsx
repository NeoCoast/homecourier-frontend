import React, { useState, useEffect } from 'react';
import {
  Avatar, Box, InfiniteScroll, Text, Button,
} from 'grommet';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Alert } from 'grommet-icons';
import Spinner from 'Components/Utils/Spinner';
import UserProfileInfo from 'Components/Utils/UserProfileInfo';

const VolunteerApplicationsList = () => {
  const loggedIn = useSelector((state) => state.logUser.loggedIn);
  const history = useHistory();
  const [voluntierApplications, setvoluntierApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loggedIn) history.push('/');
    else {
      const fetchVoluntierApplications = async () => {
        try {
          setLoading(true);
          // const res = await VoluntierApplicationsService.getVoluntierApplications('created');
          const res = [
            {
              name: 'pepe1', lastname: 'popo1', username: 'pipi1', avgCalification: 2,
            },
            {
              name: 'pepe2', lastname: 'popo2', username: 'pipi2', avgCalification: 3,
            },
            {
              name: 'pepe3', lastname: 'popo3', username: 'pipi3', avgCalification: 4,
            },
            {
              name: 'pepe4', lastname: 'popo4', username: 'pipi4', avgCalification: 5,
            }
          ];
          setLoading(false);
          // setVoluntierApplications(res.data);
          setvoluntierApplications(res);
        } catch (error) {
          setLoading(false);
          console.error('error: ', error);
        }
      };
      fetchVoluntierApplications();
    }
  }, []);

  return (
    <Box
      background="light-1"
    >
      { loading && <Spinner />}
      { !loading && voluntierApplications.length > 0 &&
        <Box
          pad="small"
        >
          <Text
            style={{
              marginBottom: "20px"
            }}
            size="large"
          >
            Lista de postulaciones
          </Text>
          <InfiniteScroll
            items={voluntierApplications}
          >
            {(item, index) => (
              <Box
                key={index}
                border={{
                  side: "bottom",
                  color: "dark-4",
                  size: "xsmall"
                }}
                style={{
                  // maxHeight: "620px", 
                  // minHeight: "150px",
                  minWidth: "600px"
                }}
                pad="small"
                direction="row"
                justify="between"
                margin="5px"
              >
                <Box
                  gap="small"
                  direction="row"
                >
                  {/* <Avatar 
                    src={`https://robohash.org/${item.username}`} 
                    border="all" 
                    />
                  <Box>
                    <Text>{`${item.name.toUpperCase()} ${item.lastname.toUpperCase()}`}</Text>
                    <Text size="xsmall" >Aca va el gradiente de calificacion papu</Text>
                  </Box> */}
                  <UserProfileInfo user={item} />
                </Box>

                <Box
                  alignSelf="center"
                >
                  <Button
                    primary
                    label="Aceptar"
                  />
                </Box>
              </Box>
            )}
          </InfiniteScroll>
        </Box>
      }
      { !loading && voluntierApplications.length === 0 &&
        <Box
          pad="small"
          direction="row"
          gap="small"
        >
          <Alert
            color="gray"
          />
          <Text
          >
            Aún no hay postulaciones de voluntarios para tomar el pedido
          </Text>
        </Box>
      }
    </Box>
  );
};

VolunteerApplicationsList.propTypes = {
  order: PropTypes.object.isRequired
}

export default VolunteerApplicationsList;