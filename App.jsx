import React from 'react'
import AppNavigator from './navigation/AppNavigator'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import { CartProvider } from './Provider/cart'
import { ProductProvider } from './Provider/product'

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
      <ProductProvider>
        <PaperProvider>
          <CartProvider>
            <AppNavigator />
          </CartProvider>
        </PaperProvider>
      </ProductProvider>

    </NavigationContainer>
  )
}

export default App
