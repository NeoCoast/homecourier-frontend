import { connect } from 'react-redux';
import App from '../App';

const mapStateToProps = (state) => ({ data: state.logUser.data });

const mapDispatchToProps = () => ({
});

const createConnection = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const AppRedux = createConnection(App);

export default AppRedux;
