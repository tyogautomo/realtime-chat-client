import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';

import { styles } from './ChatList.style';

class ChatList extends Component {
  onPressFriendList = () => {
    const { navigation } = this.props;
    navigation.naviate('FriendList');
  }

  onPressChat = () => {
    const { navigation } = this.props;
    navigation.navigate('Chat');
  }

  renderChatItem = (i) => {
    return (
      <TouchableOpacity key={i} style={styles.chatCardContainer} activeOpacity={0.6} onPress={this.onPressChat}>
        <View style={styles.avatar}>
          <Text style={styles.initialUsername}>T</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.username}>tyogautomo</Text>
          <Text style={styles.previewChat}>lagi ngapain jank?</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const chats = new Array(10).fill('');
    return (
      <View style={styles.container}>
        <ScrollView style={styles.friendListContainer}>
          {chats.map((chat, i) => this.renderChatItem(i))}
        </ScrollView>
        <TouchableOpacity style={styles.buttonFriends} activeOpacity={0.8} onPress={this.onPressFriendList}>
          <Text style={styles.textButtonFriends}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export { ChatList };
