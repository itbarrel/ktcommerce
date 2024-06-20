import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme
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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700'
  },
  backgroundStyle: {
    height: 'auto'
  }
})

export default App
