import React, { Component } from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { styles } from './FriendList.style';

class FriendList extends Component {
  onPressFriend = (friend) => () => {
    const { navigation, socketManager, user } = this.props;
    navigation.pop();
    socketManager.socket.emit('init chat', { userId: user._id, friendId: friend._id });
    // navigation.navigate('Chat', {
    //   user,
    //   recipient: friend,
    // });
  }

  renderFriendItem = (friend, i) => {
    return (
      <TouchableOpacity key={i} style={styles.chatCardContainer} activeOpacity={0.6} onPress={this.onPressFriend(friend)}>
        <View style={styles.avatar}>
          <Text style={styles.initialUsername}>{friend?.username[0]?.toUpperCase()}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.username}>{friend.username}</Text>
          <Text style={styles.previewChat}>Available</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.chatBoxContainer}>
          <TextInput style={styles.textInput} placeholder="Search Friends..." />
        </View>
        <ScrollView style={styles.listContainer}>
          {user.friends.map(friend => this.renderFriendItem(friend))}
        </ScrollView>
      </View>
    );
  }
}

export { FriendList };
