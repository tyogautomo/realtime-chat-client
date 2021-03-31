import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { debounce } from 'lodash';

import { styles } from './AddFriend.style';

class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.debounceSearch = debounce(this.searchFriend, 100);
    this.state = {
      search: '',
    };
  }
  componentDidMount() {
    this.setHeader();
  }

  componentWillUnmount() {
    const { emptySearchFriend } = this.props;
    emptySearchFriend();
  }

  setHeader = () => {
    const { navigation } = this.props;
    navigation.setOptions({
      headerTitle: props => {
        return (
          <TextInput
            autoFocus
            placeholder="Find new friends..."
            placeholderTextColor="grey"
            style={styles.textInput}
            onChangeText={this.onChangeText}
          />
        );
      },
    });
  }

  onPressAdd = (friend) => () => {
    const { socketManager, user, removeSearchItem } = this.props;
    socketManager.socket.emit('add friend', friend._id, user._id);
    removeSearchItem(friend._id);
  }

  onChangeText = (search) => {
    this.setState({ search });
    this.debounceSearch();
  }

  searchFriend = () => {
    const { search } = this.state;
    const { requestSearchFriends, emptySearchFriend } = this.props;
    if (search) {
      requestSearchFriends(search);
    } else {
      emptySearchFriend();
    }
  }

  renderFriendItem = (friend, i) => {
    return (
      <View key={i} style={styles.chatCardContainer}>
        <View style={[styles.avatar, {backgroundColor: `rgb(${friend.backgroundColor})`}]}>
          <Text style={styles.initialUsername}>{friend?.username[0]?.toUpperCase()}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.username}>{friend.username}</Text>
          <Text style={styles.previewChat}>this is my status</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={this.onPressAdd(friend)} activeOpacity={0.8}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { friendSearch } = this.props;
    return (
      <ScrollView style={styles.container}>
        {friendSearch.length !== 0 ? (
          friendSearch.map((friend, i) => this.renderFriendItem(friend, i))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>nothing...</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

export { AddFriend };
