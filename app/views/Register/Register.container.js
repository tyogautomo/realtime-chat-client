import { connect } from 'react-redux';

import { Register } from './Register.view';
import { requestRegister } from '../../redux/actions/userAction';

const mapDispatchToProps = dispatch => ({
    requestRegister: payload => dispatch(requestRegister(payload)),
});

export default connect(
    null,
    mapDispatchToProps
)(Register);
