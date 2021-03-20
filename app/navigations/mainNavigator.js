import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { Login, Chat, Register, ChatList } from '../navigations/views';

const Stack = createStackNavigator();

class MainNavigator extends Component {
  render() {
    const { user } = this.props;
    return (
      <Stack.Navigator>
        {user.username ? (
          <>
            <Stack.Screen name="ChatList" component={ChatList} options={{ title: 'Chatz' }} />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{ title: `Chat as "${user.username}"` }}
            />
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
  mapStateToProps
)(MainNavigator);
