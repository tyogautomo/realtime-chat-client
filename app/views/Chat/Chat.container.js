import { connect } from 'react-redux';

import { Chat } from './Chat.view';
import {
    updateActiveRooms,
    setCurrentRecipient,
    removeCurrentRecipient,
    clearRoomMessages
} from '../../redux/actions/userAction';

const mapStateToProps = state => ({
    socketManager: state.userReducer.socketManager,
    user: state.userReducer.user,
    messages: state.messageReducer.messages,
    currentRecipient: state.messageReducer.currentRecipient,
});

const mapDispatchToProps = dispatch => ({
    updateActiveRooms: (payload) => dispatch(updateActiveRooms(payload)),
    setCurrentRecipient: (payload) => dispatch(setCurrentRecipient(payload)),
    removeCurrentRecipient: () => dispatch(removeCurrentRecipient()),
    clearRoomMessages: () => dispatch(clearRoomMessages()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
