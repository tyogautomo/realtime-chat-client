import { connect } from 'react-redux';

import { ChatList } from './ChatList.view';
import { initSocket, requestUserData } from '../../redux/actions/userAction';

const mapStateToProps = state => ({
  user: state.userReducer.user,
  socketManager: state.userReducer.socketManager,
});

const mapDispatchToProps = dispatch => ({
  initSocket: () => dispatch(initSocket()),
  requestUserData: () => dispatch(requestUserData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);
