import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import  AppNavigator  from './navigation/Navigator'; // Changed to named import


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// Instead of importing from app.json
const appName = 'HelloMate'; // Or whatever your app name is
AppRegistry.registerComponent(appName, () => App);