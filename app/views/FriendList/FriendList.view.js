import React, { Component } from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { styles } from './FriendList.style';

class FriendList extends Component {
  componentDidMount() {
    this.initSocketListener();
  }

  componentWillUnmount() {
    this.removeSocketListener();
  }

  callbackInitiateChat = ({ room, isNewActive }) => {
    const { navigation, initChat, user } = this.props;
    const recipient = room.participants.filter(userInfo => userInfo.username !== user.username)[0];
    console.log(room.participants, 'recipient <<<<<<<<<<<<<');
    const payload = {
      activeChat: room,
      isNewActive,
    };
    initChat(payload);
    navigation.pop();
    navigation.navigate('Chat', {
      user,
      recipient,
      roomId: room._id,
    });
  }

  initSocketListener = () => {
    const { socketManager } = this.props;
    socketManager.socket.on('init chat', this.callbackInitiateChat);
  }

  removeSocketListener = () => {
    const { socketManager } = this.props;
    socketManager.socket.off('init chat', this.callbackInitiateChat);
  }

  onPressFriend = (friend) => () => {
    const { socketManager, user } = this.props;
    socketManager.socket.emit('init chat', { userId: user._id, friendId: friend._id });
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
          {user.friends.map((friend, i) => this.renderFriendItem(friend, i))}
        </ScrollView>
      </View>
    );
  }
}

export { FriendList };
