import { connect } from 'react-redux';

import { AddFriend } from './AddFriend.view';
import { requestSearchFriends, emptySearchFriend, removeSearchItem } from '../../redux/actions/userAction';

const mapStateToProps = state => ({
  user: state.userReducer.user,
  friendSearch: state.searchReducer.friendSearch,
  socketManager: state.userReducer.socketManager,
});

const mapDispatchToProps = dispatch => ({
  requestSearchFriends: (payload) => dispatch(requestSearchFriends(payload)),
  emptySearchFriend: () => dispatch(emptySearchFriend()),
  removeSearchItem: (payload) => dispatch(removeSearchItem(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFriend);
