import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerContainer: {
        elevation: 4,
        paddingHorizontal: 10,
        height: 70,
        backgroundColor: '#232D36',
        flexDirection: 'row',
        alignItems: 'center',
    },
    usernameContainer: {
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#c2c2c2',
    },
    subTitle: {
        color: '#c2c2c2',
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginLeft: 10,
    },
    avatarText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
    },
    chatListContainer: {
        flex: 1,
        paddingHorizontal: 8,
    },
    inputBoxContainer: {
        width: '100%',
        paddingVertical: 7,
        paddingHorizontal: 10,
    },
    chatInputBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: '#2C373D',
        borderRadius: 50,
        flex: 1,
        maxHeight: 90,
        color: 'white',
        paddingHorizontal: 15
    },
    sendButton: {
        backgroundColor: '#0AA49D',
        marginLeft: 10,
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendText: {
        color: 'white',
        marginLeft: 5,
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
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    textChat: {
        fontSize: 16,
        color: 'white',
        textAlign: 'justify',
        maxWidth: 249,
    },
    receiptLogo: {
        marginLeft: 10,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#a3a3a3',
        marginBottom: 3,
    },
});

export { styles };
