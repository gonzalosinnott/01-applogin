import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/screens/LoginScreen';
import HomeScreen from './components/screens/HomeScreen';
import React from 'react';
import Splash from './components/screens/Splash';


const Stack = createNativeStackNavigator();


export default function App() { 
 
  return  (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options =  {{ headerShown: false }}  name="Splash" component={Splash} />
        <Stack.Screen options =  {{ headerShown: false }}  name="Login" component={LoginScreen} />
        <Stack.Screen name="Inicio" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer> )    
}

