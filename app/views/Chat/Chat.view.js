import React, { Component } from 'react';
import { TextInput, View, ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';

import { styles } from './Chat.style';

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
        this.fetchMessages();
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
            <View style={styles.container}>
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
            </View>
        );
    }
}

export { Chat };
