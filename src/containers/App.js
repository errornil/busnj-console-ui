import { connect } from 'react-redux';
import { actionTypes } from '../actions';
import App from '../components/App';

const mapDispatchToProps = (dispatch) => ({
    websocketOpen: () => dispatch({type: actionTypes.WEBSOCKET_OPEN})
});

export default connect(null, mapDispatchToProps)(App);
