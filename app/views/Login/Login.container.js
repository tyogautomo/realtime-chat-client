/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';

import { Login } from './Login.view';
import { requestLogin } from '../../redux/actions/userAction';

const mapStateToProps = state => ({
    errResponseLogin: state.userReducer.errResponseLogin,
});

const mapDispatchToProps = dispatch => ({
    requestLogin: payload => dispatch(requestLogin(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
