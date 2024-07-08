import React from 'react'
import AppNavigator from './navigation/AppNavigator'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#faf9f7'
  }
}

function App () {
  return (
    <NavigationContainer theme={theme}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </NavigationContainer>
  )
}

export default App
