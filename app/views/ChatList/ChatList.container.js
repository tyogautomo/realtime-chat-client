import { connect } from 'react-redux';

import { ChatList } from './ChatList.view';
import { storeActiveRooms, initSocket } from '../../redux/actions/userAction';

const mapStateToProps = state => ({
  user: state.userReducer.user,
  socketManager: state.userReducer.socketManager,
});

const mapDispatchToProps = dispatch => ({
  storeActiveRooms: (payload) => dispatch(storeActiveRooms(payload)),
  initSocket: () => dispatch(initSocket()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);
