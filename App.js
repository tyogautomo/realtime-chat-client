import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import MainNavigator from './app/navigations/mainNavigator';
import { store } from './app/redux/store';

const App = () => {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
