/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';

import { Chat } from './Chat.view';

const mapStateToProps = state => ({
    socket: state.userReducer.socket,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
