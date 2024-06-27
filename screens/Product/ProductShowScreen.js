import React from 'react'
import { View, StyleSheet } from 'react-native'
import Swipper from '../../components/carousel/swipper'
import CartScreen from '../CartScreen'

const ProductShowScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Swipper />
      </View>

      <View style={styles.anotherComponent}>
        <CartScreen/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselContainer: {
    flex: 1,
    width: '100%', // Occupy full width
    justifyContent: 'center',
    alignItems: 'center'
  },
  anotherComponent: {
    flex: 1,
    width: '100%', // Occupy full width
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0' // Example background color
  }
})

export default ProductShowScreen
