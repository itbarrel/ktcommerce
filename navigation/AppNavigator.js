import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SignUpScreen from '../screens/SignupScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import ProductListingScreen from '../screens/Product/ProductListingScreen'
import ProductListing from '../components/Product'
import LoginScreen from '../screens/LoginScreen'
import CartCard from '../components/cart/card'
import CartListing from '../components/cart'
import PaymentScreen from '../screens/paymentScreen'
import ProductDetailScreen from '../screens/Product/ProductDetailScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const TabNavigator = () => (
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
    <Tab.Screen name="Home" component={ProductListingScreen} />
    <Tab.Screen name="Settings" component={LoginScreen} />
    <Tab.Screen name="Profile" component={CartListing} />
  </Tab.Navigator>
)

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
  </Stack.Navigator>
)

export default AppNavigator
