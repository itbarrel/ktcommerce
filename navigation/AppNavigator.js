import React from 'react'
import HomeScreen from '../screens/Home/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Header from '../components/Header'
const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  const { Navigator, Screen } = Tab
  return (
    <Navigator >
      <Screen name="Home" component={HomeScreen}
        options={{
          header: ({ navigation }) => <Header navigation={navigation}/>
        }}/>
      <Screen name="Settings" component={LoginScreen} />
    </Navigator>
  )
}

export default AppNavigator
