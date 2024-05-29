import { StyleSheet } from 'react-native'
import React from 'react'
import ManHinhChinh from './ManHinhChinh'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ThongKe from './ThongKe'
import Icon from 'react-native-vector-icons/FontAwesome5'
import BangXepHang from './BangXepHang'
const Tab = createBottomTabNavigator()
export default function Home(props) {
  return (

    <Tab.Navigator initialRouteName={'ManHinhChinh'} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="ManHinhChinh" component={ManHinhChinh} options={{
        tabBarIcon: ({ focused, color, size }) => <Icon name={"home"} size={30} color={color} />,
        title: "Màn hình chính",

      }} />
      <Tab.Screen name="BangXepHang" component={BangXepHang} options={{
        tabBarIcon: ({ focused, color, size }) => <Icon name={"trophy"} size={30} color={color} />,
        title: "Bảng xếp hạng",

      }}
        listeners={(props) => ({
          tabPress: (e) => {
            e.preventDefault()
            props.navigation.navigate('BangXepHang', { a: 1 })
          }
        })} />
      <Tab.Screen name='ThongKe' component={ThongKe} options={{
        tabBarIcon: ({ focused, color, size }) => <Icon name={"chart-bar"} size={30} color={color} />
        ,
        title: "Thống kê",
      }}
        listeners={(props) => ({
          tabPress: (e) => {
            e.preventDefault()
            props.navigation.navigate('ThongKe', { a: 1 })
          }
        })}
      />
    </Tab.Navigator>

  )
}

const styles = StyleSheet.create({})