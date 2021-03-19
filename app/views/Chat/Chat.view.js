/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { io } from 'socket.io-client';
import { TextInput, View, ScrollView, Text, TouchableOpacity } from 'react-native';

import { styles } from './Chat.style';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.scrollViewRef;
        this.socket = io('http://10.0.2.2:3000');
        this.state = {
            chat: '',
            chats: [],
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.scrollViewRef.scrollToEnd({ animated: false });
        }, 50);
        this.socket.on('fetch message', messages => {
            this.setState({ chats: messages });
        });
        this.socket.on('send message', msg => {
            this.setState({ chats: [...this.state.chats, msg] }, () => {
                this.scrollViewRef.scrollToEnd({ animated: true });
            });
        });
        this.fetchMessages();
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    fetchMessages = () => {
        this.socket.emit('fetch message');
    }

    sendChat = () => {
        const { route } = this.props;
        const { username } = route?.params;
        if (this.state.chat) {
            this.socket.emit('send message', {
                username,
                message: this.state.chat,
            });
        }
        this.setState({ chat: '' });
    };

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
                        <TouchableOpacity style={styles.sendButton} activeOpacity={0.8} onPress={this.sendChat}>
                            <Text style={styles.sendText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export { Chat };
