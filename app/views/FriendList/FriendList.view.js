import { debounce } from 'lodash';
import React, { Component } from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { styles } from './FriendList.style';

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.debounceSearch = debounce(this.searchCurrentFriend, 200);
  }

  componentDidMount() {
    this.initSocketListener();
  }

  componentWillUnmount() {
    this.removeSocketListener();
  }

  onPressAddFriend = () => {
    const { navigation } = this.props;
    navigation.navigate('AddFriend');
  }

  onChangeText = (search) => {
    this.setState({ search });
    this.debounceSearch();
  }

  searchCurrentFriend = () => {
    const { searchMyFriends } = this.props;
    const { search } = this.state;
    searchMyFriends(search);
  }

  callbackInitiateChat = ({ room, isNewActive }) => {
    const { navigation, initChat, user } = this.props;
    const recipient = room.participants.filter(userInfo => userInfo.username !== user.username)[0];
    const payload = {
      activeChat: room,
      isNewActive,
    };
    initChat(payload);
    navigation.pop();
    navigation.navigate('Chat', {
      user,
      recipient,
      roomId: room._id,
    });
  }

  initSocketListener = () => {
    const { socketManager } = this.props;
    socketManager.socket.on('init chat', this.callbackInitiateChat);
  }

  removeSocketListener = () => {
    const { socketManager } = this.props;
    socketManager.socket.off('init chat', this.callbackInitiateChat);
  }

  onPressFriend = (friend) => () => {
    const { socketManager, user } = this.props;
    socketManager.socket.emit('init chat', { userId: user._id, friendId: friend._id });
  }

  renderFriendItem = (friend, i) => {
    const username = friend?.username;
    return (
      <TouchableOpacity key={i} style={styles.chatCardContainer} activeOpacity={0.6} onPress={this.onPressFriend(friend)}>
        <View style={[styles.avatar, { backgroundColor: `rgb(${friend.backgroundColor})` }]}>
          <Text style={styles.initialUsername}>{`${username[0].toUpperCase()}${username[1]}`}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.username}>{friend.username}</Text>
          <Text style={styles.previewChat}>Available</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { user: { friends }, myFriendSearch } = this.props;
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.chatBoxContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Search Friends..."
            placeholderTextColor="grey"
            onChangeText={this.onChangeText}
            value={search}
          />
        </View>
        <ScrollView style={styles.listContainer}>
          {
            !search ?
              friends.map((friend, i) => this.renderFriendItem(friend, i)) :
              myFriendSearch.map((friend, i) => this.renderFriendItem(friend, i))
          }
        </ScrollView>
        <TouchableOpacity style={styles.buttonFriends} activeOpacity={0.8} onPress={this.onPressAddFriend}>
          <IonIcon style={styles.textButtonFriends} name="search" />
        </TouchableOpacity>
      </View>
    );
  }
}

export { FriendList };
