import { connect } from 'react-redux';

import { FriendList } from './FriendList.view';
import { initChat, searchMyFriends } from '../../redux/actions/userAction';

const mapStateToProps = state => ({
  user: state.userReducer.user,
  myFriendSearch: state.searchReducer.myFriendSearch,
  socketManager: state.userReducer.socketManager,
});

const mapDispatchToProps = dispatch => ({
  initChat: (payload) => dispatch(initChat(payload)),
  searchMyFriends: (payload) => dispatch(searchMyFriends(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendList);
