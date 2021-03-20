import { connect } from 'react-redux';

import { ChatList } from './ChatList.view';
import { storeActiveRooms } from '../../redux/actions/userAction';

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
  storeActiveRooms: (payload) => dispatch(storeActiveRooms(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);
