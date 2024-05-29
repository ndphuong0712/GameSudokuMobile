import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Game from './Game';
import WinGame from './WinGame';
import DangNhap from './DangNhap';
import CaiDat from './CaiDat';
import GioiHanSaiLam from './GioiHanSaiLam';
import CachChoi from './CachChoi';
const Stack = createNativeStackNavigator()
export default function AppSudoku() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false
            }}>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name='Game' component={Game}/>
                <Stack.Screen name='WinGame' component={WinGame}/>
                <Stack.Screen name='DangNhap' component={DangNhap}/>
                <Stack.Screen name='CaiDat' component={CaiDat} options={{headerShown:true,title:"Cài đặt"}}/>
                <Stack.Screen name='GioiHanSaiLam' component={GioiHanSaiLam} options={{headerShown:true,title:"Giới hạn sai lầm"}}/>
                <Stack.Screen name='CachChoi' component={CachChoi} options={{headerShown:true,title:"Cách chơi"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})