import { connect } from 'react-redux';
import { login } from '../../store/actions/logUser';
import Login from '../Login';

const mapStateToProps = (state) => ({ data: state.logUser.data });

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
});

const createConnection = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const loginRedux = createConnection(Login);

export default loginRedux;
