/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './index.scss';
import {
  Box, Heading, Grid, Avatar, Text, Card,
} from 'grommet';
import { Alert } from 'grommet-icons';
import { useSelector } from 'react-redux';
import ExactLocation from 'Components/MapsExactLocation';
import PropTypes from 'prop-types';
import usersService from 'Api/users.service';
import { useHistory } from 'react-router-dom';
import Spinner from 'Components/Utils/Spinner';
import ErrorModal from 'Components/Modals/ErrorModal';
import CalificationGradient from 'Components/Utils/CalificationGradient';
import AddImage from 'Assets/profile-picture.png';
import {
  InfiniteLoader,
  List,
  AutoSizer,
} from 'react-virtualized';

const Profile = (props) => {
  const userInfo = useSelector((state) => state.logUser.data);
  let { match: { params: { username } } } = props;
  const history = useHistory();
  username = username || userInfo.username;
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [pageRatings, setPageRatings] = useState(0);

  useEffect(() => {
    async function getUserData() {
      let response = {};
      try {
        response = await usersService.profileData(username);
      } catch (error) {
        console.log(error);
        setLoading(false);
        history.push('/404');
      }
      if (username !== userInfo.username) {
        setUserData(response.data);
        setLoading(false);
      } else {
        setUserData({ ...userInfo, ordersCompleted: response.data.ordersCompleted });
        setLoading(false);
      }
      try {
        const page = { page: pageRatings };
        const id = username === userInfo.username ? userInfo.id : response.data.id;
        const ratingsResponse = await usersService.ratingsData(page, id);
        setRatings(ratingsResponse.data.ratings);
        if (ratingsResponse.data.ratings) {
          setPageRatings(pageRatings + 1);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setInvalid(true);
      }
    }
    getUserData();
  }, [username]);

  const getRatings = async ({ stopIndex }) => {
    if (stopIndex >= 49 && stopIndex + 1 > ratings.length) {
      const ratingsResponse = await usersService.ratingsData(pageRatings, userData.id);
      setRatings(ratings.concat(ratingsResponse.data.ratings));
      if (ratingsResponse.data) {
        setPageRatings(pageRatings + 1);
      }
    }
  };

  const isItemLoaded = ({ index }) => !!ratings[index];

  const rowRenderer = ({
    index,
    style,
  }) => (
    <div style={style}>
      <Box a11yTitle="Rating" key={`rating-comment${index}`} pad={{ top: 'medium' }}>
        <Card>
          <Box fill pad={{ left: 'small' }}>
            <CalificationGradient maxRating={5} percent={((Number(ratings[index].score) * 100) / 5)} />
            <Box pad={{ bottom: 'large' }} align="center">
              {ratings[index].comment && (
                <Box>
                  <Text truncate margin="small">{`"${ratings[index].comment}"`}</Text>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      </Box>
    </div>
  );

  return (
    <Grid
      align="stretch"
      rows={['fit']}
      columns={['auto', ['auto', 'large'], 'auto']}
      gap="small"
      pad="medium"
      areas={[
        { name: 'left', start: [0, 0], end: [0, 0] },
        { name: 'center', start: [1, 0], end: [1, 0] },
        { name: 'right', start: [2, 0], end: [2, 0] },
      ]}
    >
      {loading && <Spinner />}
      {invalid && <ErrorModal errorMessage="Ha ocurrido un error al comunicarse con el servidor" setShow={setInvalid} show={invalid} />}
      {!loading && (
        <Box
          gridArea="center"
          elevation="medium"
          pad="large"
          gap="small"
          round="5px"
          direction="column"
          background="white"
        >
          <Box direction="row-responsive" pad="small" gap="small">
            <Avatar src={userData.avatar ? `${process.env.API_URL}${userData.avatar}` : AddImage} />
            <Heading level="2" margin="none" alignSelf="stretch">Perfil de {username}</Heading>
          </Box>
          <Box pad={{ left: 'small' }} direction="row-responsive" align="center" gap="small">
            <Heading margin="none" level="3">Nombre:</Heading>
            <Text size="large">{`${userData.name} ${userData.lastname}`}</Text>
          </Box>
          <Box pad={{ left: 'small' }} direction="row-responsive" align="center" gap="small">
            <Heading margin="none" level="3">Calificación:</Heading>
            {!userData.rating && (
              <Text size="large">Este usuario aún no tiene calificaciones</Text>
            )}
            {userData.rating && (
              <Box a11yTitle="Score" fill pad={{ left: 'small', top: 'small' }}>
                <CalificationGradient maxRating={5} percent={((Number(userData.rating) * 100) / 5)} />
              </Box>
            )}
          </Box>
          {userData.username === userInfo.username && (
            <Box pad={{ left: 'small' }}>
              <Heading margin="none" level="3">Dirección:</Heading>
              <Box a11yTitle="Map" pad={{ top: 'xsmall' }}>
                <ExactLocation
                  isMarkerShown
                  lat={userData.latitude}
                  lng={userData.longitude}
                  zoom={16}
                  size={300}
                />
              </Box>
            </Box>
          )}
          <Box pad={{ left: 'small' }} direction="row-responsive" align="center" gap="small">
            <Heading margin="none" level="3">Pedidos realizados:</Heading>
            <Text size="large">{userData.ordersCompleted}</Text>
          </Box>
          <Box style={{ minHeight: '420px' }} pad={{ left: 'small' }} gap="small">
            <Heading margin="none" level="3">Calificaciones y comentarios:</Heading>
            {ratings.length === 0 && (
              <Card>
                <Box pad="medium" gap="small" direction="row-responsive">
                  <Alert size="medium" />
                  <Text>Este usuario aún no tiene calificaciones</Text>
                </Box>
              </Card>

            )}
            {ratings.length > 0 && (
              <InfiniteLoader
                isRowLoaded={isItemLoaded}
                rowCount={ratings.length + 1 || 51}
                loadMoreRows={getRatings}
              >
                {({ onRowsRendered, registerChild }) => (
                  <AutoSizer>
                    {({ width }) => (
                      <List
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                        rowCount={ratings.length || 50}
                        rowRenderer={rowRenderer}
                        height={400}
                        width={width}
                        rowHeight={150}
                      />
                    )}
                  </AutoSizer>
                )}
              </InfiniteLoader>
            )}
          </Box>
        </Box>
      )}
    </Grid>
  );
};

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  }),
};

Profile.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: '',
    }),
  }),
};

export default Profile;
