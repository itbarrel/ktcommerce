import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SplashScreen from '../screens/SplashScreen'
import SignUpScreen from '../screens/SignupScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import ProductListingScreen from '../screens/Product/ProductListingScreen'
import ProductListing from '../components/Product'
import LoginScreen from '../screens/LoginScreen'
import { Image, View, StyleSheet } from 'react-native'
import CartCard from '../components/cart/card'
import GridProductCard from '../components/Product/gridCard'
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
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
)

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Tabs"
      component={TabNavigator}
      options={{ headerShown: true }}
    />
    <Stack.Screen name="ProductListingScreen" component={ProductListingScreen}
      options={{
        headerTitle: () => (
          <View style={styles.container}>
            <Image
              source={require('../assets/images/logo_sort.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        )
      }}

    />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="CartListing" component={CartListing} />
    <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen}
      options={{
        headerTitle: () => (
          <View style={styles.container}>
            <Image
              source={require('../assets/images/logo_sort.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        )
      }}
    />
  </Stack.Navigator>
)
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  logo: {
    width: 100,
    height: 100
  }
})

export default AppNavigator
