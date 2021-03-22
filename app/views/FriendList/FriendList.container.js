import { connect } from 'react-redux';

import { FriendList } from './FriendList.view';
import { initChat } from '../../redux/actions/userAction';

const mapStateToProps = state => ({
  user: state.userReducer.user,
  socketManager: state.userReducer.socketManager,
});

const mapDispatchToProps = dispatch => ({
  initChat: (payload) => dispatch(initChat(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendList);
