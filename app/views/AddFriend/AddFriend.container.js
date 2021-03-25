import { connect } from 'react-redux';

import { AddFriend } from './AddFriend.view';
import { requestSearchFriends } from '../../redux/actions/userAction';

const mapStateToProps = state => ({
  friendSearch: state.userReducer.friendSearch,
});

const mapDispatchToProps = dispatch => ({
  requestSearchFriends: (payload) => dispatch(requestSearchFriends(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFriend);
