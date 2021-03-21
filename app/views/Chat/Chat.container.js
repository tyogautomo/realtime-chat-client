/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';

import { Chat } from './Chat.view';

const mapStateToProps = state => ({
    socketManager: state.userReducer.socketManager,
    user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
