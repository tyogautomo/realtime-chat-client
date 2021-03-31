import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15212A',
    paddingHorizontal: 20,
  },
  chatBoxContainer: {
    paddingVertical: 10,
  },
  textInput: {
    backgroundColor: '#2C373D',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 30,
    color: 'white',
  },
  listContainer: {
    flex: 1,
  },
  friendCardContainer: {
    width: '100%',
    flexDirection: 'row',
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
    fontSize: 35,
    color: 'white',
  },
});

export { styles };
