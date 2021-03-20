import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';

import { styles } from './ChatList.style';

class ChatList extends Component {
  onPressFriendList = () => {
    const { navigation } = this.props;
    navigation.naviate('FriendList');
  }

  renderChatItem = () => {
    return (
      <View>

      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/*  */}
        </ScrollView>
        <TouchableOpacity style={styles.buttonFriends} activeOpacity={0.8} onPress={this.onPressFriendList}>
          <Text style={styles.textButtonFriends}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export { ChatList };
