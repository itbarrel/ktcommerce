import React from 'react'
import HomeScreen from '../screens/Home/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import ProductListingScreen from '../screens/Product/ProductListingScreen'
import profileScreen from '../screens/ProfileScreen'
import ProductShowScreen from '../screens/Product/ProductShowScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Swipper from '../components/carousel/swipper'
import Header from '../Header'
const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  const { Navigator, Screen } = Tab
  return (
    <Navigator >
      <Screen name="Home" component={LoginScreen}
        options={{
          header: ({ navigation }) => <Header navigation={navigation}/>
        }}/>
      <Screen name="Settings" component={ProductShowScreen} />
    </Navigator>
  )
}

export default AppNavigator
