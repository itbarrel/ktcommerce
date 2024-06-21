import React from 'react'
import {
  SafeAreaView
} from 'react-native'
import AppNavigator from './navigation/AppNavigator'

import {
  Colors
} from 'react-native/Libraries/NewAppScreen'

function App () {
  const backgroundStyle = {
    backgroundColor: Colors.lighter
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <AppNavigator/>
    </SafeAreaView>
  )
}

export default App
