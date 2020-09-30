import { connect } from 'react-redux';
import { logout } from '../../store/actions/logUser';
import Logout from '../Logout';

const mapStateToProps = (state) => ({ data: state.logUser.data });

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

const createConnection = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const AppBarRedux = createConnection(Logout);

export default AppBarRedux;
