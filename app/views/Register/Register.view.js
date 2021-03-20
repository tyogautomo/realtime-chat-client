import React, { useState } from 'react';
import { TextInput, View, Text, Button, TouchableOpacity } from 'react-native';

import { styles } from '../Register/Register.style';

function Register({ navigation, requestRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onPressRegister = async () => {
        if (username && password) {
            const payload = { username, password };
            await requestRegister(payload);
            navigation.navigate('Login', {
                username,
            });
        }
        setUsername('');
        setPassword('');
    };

    const onPressSignIn = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.containerLogin}>
            <Text style={styles.title}>Chatz</Text>
            <Text style={styles.subTitle}>Sign Up an Account</Text>
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
            <Button title="Register" onPress={onPressRegister} />
            <TouchableOpacity onPress={onPressSignIn}>
                <Text style={styles.signupButton}>Already have an Account</Text>
            </TouchableOpacity>
        </View>
    );
}

export { Register };
