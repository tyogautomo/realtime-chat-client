/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatListContainer: {
        backgroundColor: 'white',
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
        backgroundColor: '#0E7BF7',
        alignSelf: 'flex-end',
        paddingLeft: 10,
        paddingRight: 20,
        paddingVertical: 5,
        borderRadius: 8,
        marginVertical: 5,
        maxWidth: '80%',
        elevation: 3,
    },
    chatBoxOther: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
        paddingLeft: 10,
        paddingRight: 20,
        paddingVertical: 5,
        borderRadius: 8,
        marginVertical: 5,
        maxWidth: '80%',
        elevation: 3,
    },
    textChat: {
        fontSize: 16,
        color: 'white',
    },
    textChatOther: {
        fontSize: 16,
        color: '#1c1c1c',
    },
    username: {
        fontWeight: 'bold',
        color: '#1c1c1c',
        marginBottom: 3,
    },
});

export { styles };
