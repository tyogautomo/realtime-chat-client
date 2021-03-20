import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Login, Chat, Register, ChatList } from '../navigations/views';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="ChatList" component={ChatList} />
            <Stack.Screen
                name="Chat"
                component={Chat}
                options={({ route }) => ({ title: `Chat as "${route?.params.username}"` })}
            />
        </Stack.Navigator>
    );
};

export { MainNavigator };
