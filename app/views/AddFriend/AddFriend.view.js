import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { debounce } from 'lodash';

import { styles } from './AddFriend.style';

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
    console.log(search);
  }

  renderFriendItem = (friend, i) => {
    return (
      <TouchableOpacity key={i} style={styles.chatCardContainer} activeOpacity={0.6}>
        <View style={styles.avatar}>
          <Text style={styles.initialUsername}>A</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.username}>abalabal</Text>
          <Text style={styles.previewChat}>im just a noob</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const list = new Array(0).fill('');
    const { friendSearch } = this.props;
    return (
      <ScrollView style={styles.container}>
        {list.length !== 0 ? (
          list.map((el, i) => this.renderFriendItem(el, i))
        ) : (
          <View style={{ alignItems: 'center', paddingVertical: 20, marginTop: 50 }}>
            <Text style={{ fontSize: 20, color: 'grey' }}>Search with username...</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

export { AddFriend };
