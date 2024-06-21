import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/Home/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

export default function TabNavigator () {
  return (
    <NavigationContainer>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={LoginScreen} />
    </NavigationContainer>
  )
}
