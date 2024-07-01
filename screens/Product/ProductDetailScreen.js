import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Swipper from '../../components/carousel/swipper'
import { RetrieveProduct } from '../../services/product'

import CartProductScreen from '../CartProductScreen'

const ProductDetailScreen = (props) => {
  const [product, setProduct] = useState({})

  const id = props.route.params.id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = props.route.params.id
        const res = await RetrieveProduct(id)
        setProduct(res)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }
    fetchData()
  }, [id])
  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Swipper product={product} />
      </View>

      <View style={styles.anotherComponent}>
        <CartProductScreen product={product} />
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

export default ProductDetailScreen
