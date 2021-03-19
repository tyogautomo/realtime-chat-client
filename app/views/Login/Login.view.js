/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { TextInput, View, Text, Button, TouchableOpacity } from 'react-native';

import { styles } from './Login.style';

function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onPressLogin = () => {
        if (username) {
            navigation.navigate('Chat', {
                username,
            });
        }
        setUsername('');
        setPassword('');
    };

    const onPressSignUp = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.containerLogin}>
            <Text style={styles.title}>Chatz</Text>
            <TextInput
                style={styles.authInput}
                placeholder="Username..."
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.authInput}
                placeholder="Password..."
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <Button title="Login" onPress={onPressLogin} />
            <TouchableOpacity onPress={onPressSignUp}>
                <Text style={styles.signupButton}>Create an Account</Text>
            </TouchableOpacity>
        </View>
    );
};

export { Login };
