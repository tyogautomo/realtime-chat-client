import { connect } from 'react-redux';

import { Chat } from './Chat.view';
import { updateActiveRooms } from '../../redux/actions/userAction';

const mapStateToProps = state => ({
    socketManager: state.userReducer.socketManager,
    user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
    updateActiveRooms: (payload) => dispatch(updateActiveRooms(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
