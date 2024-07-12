import React, { useEffect, useState } from 'react'
import { FlatList, View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { fetchProducts } from '../../services/product'
import { TouchableOpacity } from 'react-native-gesture-handler'
import GridProductCard from './gridCard'

import ProductCard from './card'

const ProductListing = ({ categoryId, searchQuery, viewMode }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  let page = 1
  const fetchData = async (page, oldProducts = []) => {
    try {
      setLoading(true)
      const res = await fetchProducts({ category: categoryId, search: searchQuery, page })
      setProducts([...oldProducts, ...res])
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setProducts([])
    page = 1
    fetchData(page)
  }, [categoryId, searchQuery])

  const handleLoadMore = () => {
    page += 1
    fetchData(page, products)
  }
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (viewMode === 'grid' ? <GridProductCard item={item} /> : <ProductCard item={item} />)}
      keyExtractor={(item) => item.id.toString()}
      numColumns={viewMode === 'grid' ? 2 : 1}
      key={viewMode === 'grid' ? 'grid' : 'list'}
      ListFooterComponent={
        products.length > 0 && (
          <View style={{ padding: 20 }}>
            {loading
              ? (
                <ActivityIndicator size="large" color="#0000ff" />
              )
              : (
                <TouchableOpacity style={styles.button} onPress={handleLoadMore}>
                  <Text style={styles.buttonText}>Show More</Text>
                </TouchableOpacity>
              )}
          </View>
        )
      }
    />
  )
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7BCFE9',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff', // Set the text color
    fontSize: 16
  }
})

export default ProductListing
