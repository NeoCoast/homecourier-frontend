import { connect } from 'react-redux';
import AppBar from '../../components/AppBar';

const mapStateToProps = (state) => ({ data: state.logUser.data });

const mapDispatchToProps = () => ({
});

const createConnection = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const AppBarRedux = createConnection(AppBar);

export default AppBarRedux;
