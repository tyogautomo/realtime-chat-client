import { connect } from 'react-redux';

import { AddFriend } from './AddFriend.view';
import { requestSearchFriends, emptySearchFriend } from '../../redux/actions/userAction';

const mapStateToProps = state => ({
  user: state.userReducer.user,
  friendSearch: state.searchReducer.friendSearch,
  socketManager: state.userReducer.socketManager,
});

const mapDispatchToProps = dispatch => ({
  requestSearchFriends: (payload) => dispatch(requestSearchFriends(payload)),
  emptySearchFriend: () => dispatch(emptySearchFriend()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFriend);
