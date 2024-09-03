import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Swipper from '../../components/Carousel/swipper'
import { RetrieveProduct } from '../../services/product'
import CartProductScreen from '../CartProductScreen'

const ProductDetailScreen = (props) => {
  const [product, setProduct] = useState({})
  const { id, setaddToCart } = props?.route?.params

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = props.route.params.id
        const response = await RetrieveProduct(id)
        setProduct(response)
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
        <CartProductScreen product={product} setaddToCart={setaddToCart} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%'

  },
  carouselContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    borderColor: '#f0efee',
    borderWidth: 1,
    alignItems: 'center'
  },
  anotherComponent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0'
  }
})

export default ProductDetailScreen
