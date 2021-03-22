import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
    paddingHorizontal: 20,
  },
  chatBoxContainer: {
    paddingVertical: 10,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 30,
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
    color: '#5c5c5c',
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  previewChat: {
    color: '#858585',
    fontSize: 15,
  }
});

export { styles };
