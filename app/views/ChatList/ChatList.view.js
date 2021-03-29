import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import { styles } from './ChatList.style';
import { formatTime } from '../../utils/helpers';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.scrollViewRef;
  }

  componentDidMount() {
    const { requestUserData } = this.props;
    requestUserData();
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
    const { username, backgroundColor } = chat?.participants?.filter(userInfo => userInfo.username !== user.username)[0];
    let lastMessage = chat?.lastMessage?.message || '';
    const isRead = chat?.lastMessage?.read;
    const sender = chat?.lastMessage?.sender;
    const unreadMessages = chat?.unreadMessages?.filter(msg => msg.recipient.username === user.username);
    const senderIsMine = sender?.username === user.username;
    if (lastMessage.length > 20) {
      lastMessage = `${lastMessage?.slice(0, senderIsMine ? 20 : 25)}...`;
    }
    return (
      <TouchableOpacity key={i} style={styles.chatCardContainer} activeOpacity={0.6} onPress={this.onPressChat(chat)}>
        <View style={[styles.avatar, { backgroundColor: `rgb(${backgroundColor})` }]}>
          <Text style={styles.initialUsername}>{username[0].toUpperCase()}</Text>
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.username}>{username}</Text>
            <View style={styles.messageContainer}>
              {senderIsMine && <IonIcon name="checkmark-done" size={20} color={isRead ? '#46b2d4' : 'grey'} style={styles.receiptLogo} />}
              <Text style={lastMessage ? styles.previewChat : styles.previewNoChat}>{lastMessage || 'no message'}</Text>
            </View>
          </View>
          <View style={styles.notifContainer}>
            <View>
              <Text style={styles.date}>{formatTime(chat?.updatedAt)}</Text>
            </View>
            {unreadMessages.length !== 0 ? (
              <View style={styles.unreadCountContainer}>
                <Text style={styles.unreadText}>{unreadMessages.length}</Text>
              </View>
            ) : null}
          </View>
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
