import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';

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
    this.setHeader();
  }

  setHeader = () => {
    const { navigation, user } = this.props;
    navigation.setOptions({
      header: props => {
        return (
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Hi, {user.username}</Text>
          </View>
        );
      },
    });
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

  onPressRoom = (chat) => () => {
    const { navigation, user } = this.props;
    const recipient = chat?.participants?.filter(userInfo => userInfo.username !== user.username)[0];
    navigation.navigate('Chat', {
      user,
      recipient,
      roomId: chat._id,
    });
  }

  renderRoomItem = (room, i) => {
    const { user } = this.props;
    const { username, backgroundColor } = room?.participants?.filter(userInfo => userInfo.username !== user.username)[0];
    const lastMessage = room?.lastMessage;
    let message = lastMessage?.message || '';
    const isRead = lastMessage?.read;
    const sender = lastMessage?.sender;
    const unreadMessages = room?.unreadMessages?.filter(msg => msg.recipient.username === user.username);
    const senderIsMine = sender?.username === user.username;
    if (message.includes('\n')) {
      message = `${message.split('\n')[0]}...`;
    }
    if (message.length > 20) {
      message = `${message?.slice(0, senderIsMine ? 20 : 25)}...`;
    }
    return (
      <TouchableOpacity key={i} style={styles.chatCardContainer} activeOpacity={0.6} onPress={this.onPressRoom(room)}>
        <View style={[styles.avatar, { backgroundColor: `rgb(${backgroundColor})` }]}>
          <Text style={styles.initialUsername}>{`${username[0].toUpperCase()}${username[1]}`}</Text>
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.username}>{username}</Text>
            <View style={styles.messageContainer}>
              {senderIsMine && <IonIcon name="checkmark-done" size={20} color={isRead ? '#46b2d4' : 'grey'} style={styles.receiptLogo} />}
              <Text style={message ? styles.previewChat : styles.previewNoChat}>{message || 'no message'}</Text>
            </View>
          </View>
          <View style={styles.notifContainer}>
            <View>
              <Text style={styles.date}>{formatTime(lastMessage?.createdAt)}</Text>
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
        <StatusBar backgroundColor="#15212A" />
        <ScrollView style={styles.friendListContainer}>
          {
            activeChats.length === 0 ? (
              <View style={styles.emptyList}>
                <Text style={styles.emptyText}>You have no active Chats.</Text>
                <Text style={styles.emptyText}>Add it by press (+) button below.</Text>
              </View>
            ) : activeChats.map((room, i) => this.renderRoomItem(room, i))
          }
        </ScrollView>
        <TouchableOpacity style={styles.buttonFriends} activeOpacity={0.8} onPress={this.onPressFriendList}>
          <AntIcon name="user" style={styles.textButtonFriends}/>
        </TouchableOpacity>
      </View>
    );
  }
}

export { ChatList };
