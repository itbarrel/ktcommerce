import React from 'react'
import AppNavigator from './navigation/AppNavigator'
import { NavigationContainer } from '@react-navigation/native'

function App () {
  return (
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
  )
}

export default App
