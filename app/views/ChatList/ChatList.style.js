import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
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
    justifyContent: 'center',
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
  previewChat: {
    color: '#858585',
    fontSize: 15,
  },
});

export { styles };
