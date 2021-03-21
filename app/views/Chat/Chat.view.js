import React, { Component } from 'react';
import { TextInput, View, ScrollView, Text, TouchableOpacity } from 'react-native';

import { styles } from './Chat.style';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.scrollViewRef;
        this.state = {
            chat: '',
            chats: [],
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.scrollViewRef.scrollToEnd({ animated: false });
        }, 50);
        // this.initSocketListener();
        // this.fetchMessages();
        this.joinRoom();
    }

    initSocketListener = () => {
        const { socketManager } = this.props;

        socketManager.socket.on('fetch message', messages => {
            this.setState({ chats: messages });
        });
        socketManager.socket.on('send message', msg => {
            this.setState({ chats: [...this.state.chats, msg] }, () => {
                this.scrollViewRef.scrollToEnd({ animated: true });
            });
        });
    }

    componentWillUnmount() {
        const { socketManager, route } = this.props;
        const { roomId } = route?.params;
        socketManager.socket.emit('leave room', roomId);
    }

    onSendChat = () => {
        const { route, socketManager, user } = this.props;
        const { roomId, recipient } = route?.params;
        const { chat } = this.state;
        if (this.state.chat) {
            const payload = {
                senderId: user._id,
                recipientId: recipient._id,
                roomId,
                message: chat,
            };
            socketManager.socket.emit('send message', payload);
        }
        this.setState({ chat: '' });
    };

    joinRoom = () => {
        const { socketManager, route } = this.props;
        const { roomId } = route?.params;
        socketManager.socket.emit('join room', roomId);
    }

    fetchMessages = () => {
        const { socketManager } = this.props;
        socketManager.socket.emit('fetch message');
    }

    renderChatItem = (item, i) => {
        const { route } = this.props;
        const currentUsername = route?.params.username;
        const isMine = currentUsername === item.username;
        return (
            <View
                key={i}
                style={isMine ? styles.chatBox : styles.chatBoxOther}
            >
                <Text style={styles.username}>{isMine ? 'You' : item.username}</Text>
                <Text style={isMine ? styles.textChat : styles.textChatOther}>{item.message}</Text>
            </View>
        );
    }

    render() {
        const { chats } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.chatListContainer} ref={ref => { this.scrollViewRef = ref; }}>
                    {chats.map((chat, i) => this.renderChatItem(chat, i))}
                </ScrollView>
                <View style={styles.inputBoxContainer}>
                    <View style={styles.chatInputBox}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Type text..."
                            onChangeText={(chat) => this.setState({ chat })}
                            value={this.state.chat}
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
