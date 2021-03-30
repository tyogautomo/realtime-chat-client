import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import {
  Login,
  Chat,
  Register,
  ChatList,
  FriendList,
  AddFriend,
} from '../navigations/views';

const Stack = createStackNavigator();

class MainNavigator extends Component {

  render() {
    const { user } = this.props;
    return (
      <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
        {user.username ? (
          <>
            <Stack.Screen name="ChatList" component={ChatList} />
            <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
            <Stack.Screen name="FriendList" component={FriendList} options={{ title: 'Friends' }} />
            <Stack.Screen name="AddFriend" component={AddFriend} options={{ title: 'Add Friend' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator >
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export default connect(
  mapStateToProps,
)(MainNavigator);
