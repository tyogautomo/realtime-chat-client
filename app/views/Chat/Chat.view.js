import React, { Component } from 'react';
import { TextInput, View, FlatList, Text, TouchableOpacity, ImageBackground } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { styles } from './Chat.style';
import background from '../../assets/wabg.png';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.scrollViewRef;
    this.state = {
      message: '',
      messages: [],
    };
  }

  componentDidMount() {
    this.onSetRecipientAndRoom();
    this.onFetchAndReadMessages();
    this.setHeader();
  }

  componentWillUnmount() {
    const { removeCurrentRecipient } = this.props;
    removeCurrentRecipient();
  }

  setHeader = () => {
    const { navigation, route } = this.props;
    const { recipient } = route?.params;
    navigation.setOptions({
      headerTitle: props => {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.avatar, { backgroundColor: `rgb(${recipient.backgroundColor})` }]}>
              <Text style={styles.avatarText}>{recipient.username[0].toUpperCase()}</Text>
            </View>
            <View style={styles.usernameContainer}>
              <Text style={styles.headerTitle}>{recipient.username}</Text>
              <Text style={{color: '#c2c2c2'}}>is typing...</Text>
            </View>
          </View>
        );
      },
      headerStyle: {
        backgroundColor: '#232D36',
        elevation: 0,
        height: 60,
      },
      headerTintColor: 'white',
    });
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
              onChangeText={(message) => this.setState({ message })}
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
