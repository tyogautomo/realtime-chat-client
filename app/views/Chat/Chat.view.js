import React, { Component } from 'react';
import { TextInput, View, ScrollView, Text, TouchableOpacity } from 'react-native';

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
        setTimeout(() => {
            this.scrollViewRef.scrollToEnd({ animated: false });
        }, 50);
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

    renderChatItem = (chat, i) => {
        const { route } = this.props;
        const { username: currentUsername } = route?.params?.user;
        const { username: chatSenderUsername } = chat?.sender;
        const isMine = currentUsername === chatSenderUsername;
        return (
            <View
                key={i}
                style={isMine ? styles.chatBox : styles.chatBoxOther}
            >
                <Text style={styles.username}>{isMine ? 'You' : chatSenderUsername}</Text>
                <Text style={isMine ? styles.textChat : styles.textChatOther}>{chat.message}</Text>
            </View>
        );
    }

    render() {
        const { messages } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.chatListContainer} ref={ref => { this.scrollViewRef = ref; }}>
                    {messages.map((message, i) => this.renderChatItem(message, i))}
                </ScrollView>
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
