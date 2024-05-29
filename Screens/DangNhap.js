import React from 'react';
import Login from './Login';
import Signup from './Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function DangNhap() {
  return (

      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
      </Stack.Navigator>
    
  );
}
