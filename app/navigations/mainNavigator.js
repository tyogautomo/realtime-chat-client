/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Login, Chat, Register } from '../navigations/views';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen
                name="Chat"
                component={Chat}
                options={({ route }) => ({ title: `Chat as "${route?.params.username}"` })}
            />
        </Stack.Navigator>
    );
};

export { MainNavigator };
