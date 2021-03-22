import React, { Component } from 'react';
import {
    TextInput,
    View,
    Text,
    Button,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import { styles } from './Login.style';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    onPressLogin = async () => {
        const { username, password } = this.state;
        const { requestLogin, navigation } = this.props;
        if (username && password) {
            const payload = { username, password };
            await requestLogin(payload);
            const { errResponseLogin } = this.props;
            if (!errResponseLogin) {
                navigation.navigate('ChatList', {
                    username,
                });
            }
        }
        this.setState({ username: '', password: '' });
    };

    onPressSignUp = () => {
        const { navigation } = this.props;
        navigation.navigate('Register');
    };

    render() {
        const { username, password } = this.state;
        const { errResponseLogin } = this.props;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.containerLogin}>
                    <Text style={styles.title}>Chatz</Text>
                    <TextInput
                        style={styles.authInput}
                        placeholder="Username..."
                        onChangeText={(text) => this.setState({ username: text })}
                        value={username}
                    />
                    <TextInput
                        style={styles.authInput}
                        placeholder="Password..."
                        onChangeText={(text) => this.setState({ password: text })}
                        value={password}
                    />
                    {errResponseLogin && (<Text style={styles.errorText}>{errResponseLogin}</Text>)}
                    <Button title="Login" onPress={this.onPressLogin} />
                    <TouchableOpacity onPress={this.onPressSignUp}>
                        <Text style={styles.signupButton}>Create an Account</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export { Login };
