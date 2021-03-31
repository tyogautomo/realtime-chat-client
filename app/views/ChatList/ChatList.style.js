import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    elevation: 3,
    paddingHorizontal: 20,
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#232D36',
  },
  headerTitle: {
    color: '#c2c2c2',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#15212A',
  },
  buttonFriends: {
    backgroundColor: '#0AA49D',
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
    fontSize: 25,
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
    fontSize: 22,
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
  notifContainer: {
    paddingVertical: 17,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
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
  date: {
    color: '#858585',
  },
  unreadCountContainer: {
    width: 23,
    height: 23,
    borderRadius: 20,
    backgroundColor: '#0AA49D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#15212A',
    fontSize: 12,
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
