import React, { Component } from 'react';
import { TextInput, View, FlatList, Text, TouchableOpacity, ImageBackground } from 'react-native';

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
    this.setRecipient();
    this.fetchMessages();
  }

  componentWillUnmount() {
    const { removeCurrentRecipient } = this.props;
    removeCurrentRecipient();
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

  setRecipient = () => {
    const { setCurrentRecipient, route } = this.props;
    const { recipient } = route?.params;
    setCurrentRecipient(recipient);
  }

  fetchMessages = () => {
    const { socketManager, route } = this.props;
    const { roomId } = route?.params;
    socketManager.socket.emit('fetch messages', roomId);
  }

  renderChatItem = ({ item }) => {
    const chat = item;
    const { route } = this.props;
    const { username: currentUsername } = route?.params?.user;
    const { username: chatSenderUsername } = chat?.sender;
    const isMine = currentUsername === chatSenderUsername;
    return (
      <View style={isMine ? styles.chatBox : styles.chatBoxOther}>
        <Text style={styles.username}>{isMine ? 'You' : chatSenderUsername}</Text>
        <Text style={isMine ? styles.textChat : styles.textChatOther}>{chat.message}</Text>
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
              placeholder="Type text..."
              onChangeText={(message) => this.setState({ message })}
              value={this.state.message}
              multiline={true}
            />
            <TouchableOpacity style={styles.sendButton} activeOpacity={0.8} onPress={this.onSendChat}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export { Chat };
