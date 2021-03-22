import { connect } from 'react-redux';

import { FriendList } from './FriendList.view';

const mapStateToProps = state => ({
  user: state.userReducer.user,
  socketManager: state.userReducer.socketManager,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendList);
