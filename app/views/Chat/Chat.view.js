import React, { Component } from 'react';
import { TextInput, View, FlatList, Text, TouchableOpacity, ImageBackground } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EntIcon from 'react-native-vector-icons/Entypo';
import { debounce } from 'lodash';

import { styles } from './Chat.style';
import background from '../../assets/wabg.png';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.scrollViewRef;
    this.state = {
      message: '',
      isOnline: false,
      isTyping: false,
    };
    this.debounceNotifyTyping = debounce(this.notifyTyping, 200);
  }

  componentDidMount() {
    this.onSetRecipientAndRoom();
    this.onFetchAndReadMessages();
    this.initSocketListener();
  }

  componentWillUnmount() {
    const { removeCurrentRecipient, clearRoomMessages, socketManager, route } = this.props;
    const { roomId } = route?.params;

    socketManager.socket.emit('notify typing', false, roomId);
    removeCurrentRecipient();
    clearRoomMessages();
    this.onRemoveListener();
  }

  initSocketListener = () => {
    const { socketManager, route } = this.props;
    const { recipient } = route?.params;

    socketManager.socket.emit('get online info', recipient._id);

    socketManager.socket.on('get online info', this.onReceiveOnlineInfo);
    socketManager.socket.on('notify typing', this.onReceiveTypingNotif);
  }

  notifyTyping = () => {
    const { socketManager, route } = this.props;
    const { roomId } = route?.params;
    const { message } = this.state;
    if (message) {
      socketManager.socket.emit('notify typing', true, roomId);
    } else {
      socketManager.socket.emit('notify typing', false, roomId);
    }
  }

  onRemoveListener = () => {
    const { socketManager } = this.props;
    socketManager.socket.off('get online info', this.onReceiveOnlineInfo);
    socketManager.socket.off('notify typing', this.onReceiveTypingNotif);
  }

  onReceiveOnlineInfo = ({ isOnline, recipientId }) => {
    const { currentRecipient } = this.props;
    if (currentRecipient._id.toString() === recipientId.toString()) {
      this.setState({ isOnline });
    }
  }

  onReceiveTypingNotif = (isTyping) => {
    this.setState({ isTyping });
  }

  onSendChat = () => {
    const { route, socketManager, user } = this.props;
    const { roomId, recipient } = route?.params;
    const { message } = this.state;
    if (message) {
      const payload = {
        senderId: user._id,
        recipientId: recipient._id,
        roomId,
        message: message,
      };
      socketManager.socket.emit('send message', payload);
    }
    this.setState({ message: '' });
    socketManager.socket.emit('notify typing', false, roomId);
  };

  onSetRecipientAndRoom = () => {
    const { setCurrentRecipient, route } = this.props;
    const { recipient, roomId } = route?.params;
    const payload = { recipient, roomId };
    setCurrentRecipient(payload);
  }

  onFetchAndReadMessages = () => {
    const { socketManager, route, user } = this.props;
    const { roomId } = route?.params;
    socketManager.socket.emit('read messages', roomId, user._id);
    socketManager.socket.emit('fetch messages', roomId);
  }

  onPressBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  onChangeText = (message) => {
    this.setState({ message });
    this.debounceNotifyTyping();
  }

  renderHeader = () => {
    const { route } = this.props;
    const { recipient } = route?.params;
    const { isOnline, isTyping } = this.state;
    const username = recipient?.username;
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={this.onPressBack} activeOpacity={0.6}>
          <EntIcon name="chevron-thin-left" color="#c2c2c2" size={25} />
        </TouchableOpacity>
        <View style={[styles.avatar, { backgroundColor: `rgb(${recipient.backgroundColor})` }]}>
          <Text style={styles.avatarText}>{`${username[0].toUpperCase()}${username[1]}`}</Text>
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.headerTitle}>{recipient.username}</Text>
          {
            isTyping ? (<Text style={styles.subTitle}>is typing...</Text>) :
              isOnline ? (<Text style={styles.subTitle}>online</Text>) : null
          }
        </View>
      </View>
    );
  }

  renderChatItem = ({ item }) => {
    const chat = item;
    const { route } = this.props;
    const { username: currentUsername } = route?.params?.user;
    const { username: chatSenderUsername } = chat?.sender;
    const isRead = chat?.read;
    const isMine = currentUsername === chatSenderUsername;
    return (
      <View style={isMine ? styles.chatBox : styles.chatBoxOther}>
        <Text style={styles.username}>{isMine ? 'You' : chatSenderUsername}</Text>
        <View style={styles.messageContainer}>
          <Text style={styles.textChat}>{chat.message}</Text>
          {isMine && <IonIcon name="checkmark-done" size={20} color={isRead ? '#46b2d4' : 'grey'} style={styles.receiptLogo} />}
        </View>
      </View>
    );
  }

  render() {
    const { messages } = this.props;
    return (
      <ImageBackground style={styles.container} source={background}>
        {this.renderHeader()}
        <FlatList
          inverted
          data={messages}
          renderItem={this.renderChatItem}
          keyExtractor={item => item._id}
          style={styles.chatListContainer}
        />
        <View style={styles.inputBoxContainer}>
          <View style={styles.chatInputBox}>
            <TextInput
              style={styles.textInput}
              placeholder="Type message..."
              placeholderTextColor="grey"
              onChangeText={this.onChangeText}
              value={this.state.message}
              multiline={true}
            />
            <TouchableOpacity style={styles.sendButton} activeOpacity={0.8} onPress={this.onSendChat}>
              <IonIcon name="send" color="white" size={20} style={styles.sendText} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export { Chat };
