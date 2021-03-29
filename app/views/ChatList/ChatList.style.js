import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202728',
  },
  buttonFriends: {
    backgroundColor: 'skyblue',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    bottom: 0,
    right: 20,
  },
  textButtonFriends: {
    fontSize: 35,
    color: 'white',
  },
  friendListContainer: {
    paddingHorizontal: 20,
  },
  chatCardContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginVertical: 10,
  },
  initialUsername: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: 0.5,
    borderBottomColor: '#858585',
  },
  username: {
    color: '#c4c4c4',
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewChat: {
    color: '#858585',
    fontSize: 15,
  },
  previewNoChat: {
    color: '#6e6e6e',
    fontSize: 15,
    fontStyle: 'italic',
  },
  receiptLogo: {
    marginRight: 5,
  },
  unreadCountContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#20B174',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
  },
  emptyList: {
    marginTop: 80,
    width: '100%',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: '#c4c4c4',
  },
});

export { styles };
