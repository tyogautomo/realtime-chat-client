import { connect } from 'react-redux';

import { AddFriend } from './AddFriend.view';
import { requestSearchFriends, emptySearchFriend } from '../../redux/actions/userAction';

const mapStateToProps = state => ({
  friendSearch: state.searchReducer.friendSearch,
});

const mapDispatchToProps = dispatch => ({
  requestSearchFriends: (payload) => dispatch(requestSearchFriends(payload)),
  emptySearchFriend: () => dispatch(emptySearchFriend()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFriend);
