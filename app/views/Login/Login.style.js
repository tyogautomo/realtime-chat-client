/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        fontSize: 80,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    containerLogin: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'skyblue',
    },
    authInput: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    signupButton: {
        color: '#368fc9',
        textDecorationLine: 'underline',
        marginTop: 30,
    },
});

export { styles };
