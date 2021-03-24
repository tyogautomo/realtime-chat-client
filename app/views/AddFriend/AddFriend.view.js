import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native';

import { styles } from './AddFriend.style';

class AddFriend extends Component {
  componentDidMount() {
    this.setHeader();
  }

  setHeader = () => {
    const { navigation } = this.props;
    navigation.setOptions({
      headerTitle: props => {
        return <TextInput autoFocus placeholder="Find new friends..." style={styles.textInput} />;
      },
    });
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
    return (
      <ScrollView style={styles.container}>
        {this.renderFriendItem()}
      </ScrollView>
    );
  }
}

export { AddFriend };
