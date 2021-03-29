import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatListContainer: {
        flex: 1,
        paddingHorizontal: 8,
    },
    inputBoxContainer: {
        width: '100%',
        backgroundColor: '#1c1c1c',
        paddingVertical: 7,
        paddingHorizontal: 15,
    },
    chatInputBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 5,
        flex: 1,
        maxHeight: 90,
    },
    sendButton: {
        backgroundColor: 'skyblue',
        marginLeft: 10,
        height: 50,
        paddingHorizontal: 15,
        borderRadius: 5,
        justifyContent: 'center',
    },
    sendText: {
        color: 'white',
        fontSize: 18,
    },
    chatBox: {
        backgroundColor: '#064643',
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 6,
        marginVertical: 5,
        maxWidth: '80%',
        elevation: 3,
    },
    chatBoxOther: {
        backgroundColor: '#1F2D37',
        alignSelf: 'flex-start',
        paddingLeft: 10,
        paddingRight: 20,
        paddingVertical: 7,
        borderRadius: 6,
        marginVertical: 5,
        maxWidth: '80%',
        elevation: 3,
    },
    textChat: {
        fontSize: 16,
        color: 'white',
    },
    username: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#a3a3a3',
        marginBottom: 3,
    },
});

export { styles };
