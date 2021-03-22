import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';

import { styles } from './ChatList.style';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.scrollViewRef;
  }

  componentDidMount() {
    this.connectSocket();
  }

  connectSocket = () => {
    const { initSocket, socketManager } = this.props;
    if (!socketManager?.socket?.emit) {
      console.log('NEED to connect socket <<<<<<<');
      initSocket();
    } else {
      console.log('NO NEED to connect ~~~~');
    }
  }

  onPressFriendList = () => {
    const { navigation } = this.props;
    navigation.navigate('FriendList');
  }

  onPressChat = (chat) => () => {
    const { navigation, user } = this.props;
    const recipient = chat?.participants?.filter(userInfo => userInfo.username !== user.username)[0];
    navigation.navigate('Chat', {
      user,
      recipient,
      roomId: chat._id,
    });
  }

  renderChatItem = (chat, i) => {
    const { user } = this.props;
    const { username } = chat?.participants?.filter(userInfo => userInfo.username !== user.username)[0];
    let lastMessage = chat?.lastMessage?.message || '';
    if (lastMessage.length > 25) {
      lastMessage = `${lastMessage?.slice(0, 25)}...`;
    }
    return (
      <TouchableOpacity key={i} style={styles.chatCardContainer} activeOpacity={0.6} onPress={this.onPressChat(chat)}>
        <View style={styles.avatar}>
          <Text style={styles.initialUsername}>{username[0].toUpperCase()}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={lastMessage ? styles.previewChat : styles.previewNoChat}>{lastMessage || 'no message'}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { user: { activeChats } } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.friendListContainer}>
          {
            activeChats.length === 0 ? (
              <View style={styles.emptyList}>
                <Text style={styles.emptyText}>You have no active Chats.</Text>
                <Text style={styles.emptyText}>Add it by press (+) button below.</Text>
              </View>
            ) : activeChats.map((chat, i) => this.renderChatItem(chat, i))
          }
        </ScrollView>
        <TouchableOpacity style={styles.buttonFriends} activeOpacity={0.8} onPress={this.onPressFriendList}>
          <Text style={styles.textButtonFriends}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export { ChatList };
