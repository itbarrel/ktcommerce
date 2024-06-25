import React from 'react'
import AppNavigator from './navigation/AppNavigator'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'orange'
  }
}

function App () {
  return (
    <NavigationContainer theme={theme}>
      <AppNavigator/>
    </NavigationContainer>
  )
}

export default App
