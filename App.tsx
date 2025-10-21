import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from './src/context/MenuContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ChefScreen from './src/screens/ChefScreen';
import AddDishScreen from './src/screens/AddDishScreen';
import MenuDisplayScreen from './src/screens/MenuDisplayScreen';
import type { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Chef" component={ChefScreen} />
          <Stack.Screen name="AddDish" component={AddDishScreen} />
          <Stack.Screen name="MenuDisplay" component={MenuDisplayScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
