import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { debounce } from 'lodash';

import { styles } from './AddFriend.style';
import { getRandomColor } from '../../utils/helpers';

class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.debounceSearch = debounce(this.searchFriend, 500);
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
            style={styles.textInput}
            onChangeText={this.onChangeText}
          />
        );
      },
    });
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
        <View style={styles.avatar}>
          <Text style={styles.initialUsername}>{friend?.username[0]?.toUpperCase()}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.username}>{friend.username}</Text>
          <Text style={styles.previewChat}>this is my status</Text>
        </View>
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
