import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#15212A',
  },
  textInput: {
    fontSize: 16,
    color: 'white',
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
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 20,
    color: 'grey',
  },
  addButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#0AA49D',
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
  },
});

export { styles };
