import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SignUpScreen from '../screens/SignupScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import CartCard from '../components/cart/card'
import CartListing from '../components/cart'
import ProductShowScreen from '../screens/Product/ProductShowScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === 'Home') {
            iconName = 'home'
          } else if (route.name === 'Settings') {
            iconName = 'settings'
          } else if (route.name === 'Profile') {
            iconName = 'person'
          }

          return <Icon name={iconName} size={size} color={color} />
        }
      })}

    >
      <Tab.Screen name="Home" component={SignUpScreen} />
      <Tab.Screen name="Settings" component={ProductShowScreen} />
      <Tab.Screen name="Profile" component={CartListing} />
    </Tab.Navigator>
  )
}

export default AppNavigator
