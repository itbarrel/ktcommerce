import React, { useEffect, useState, useRef } from 'react'
import { FlatList, View, ActivityIndicator } from 'react-native'
import { fetchProducts } from '../../services/product'
import GridProductCard from './gridCard'
import ProductCard from './card'

const ProductListing = ({ categoryId, searchQuery, viewMode }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [noMoreProducts, setNoMoreProducts] = useState(false)
  const pageRef = useRef(1)

  const fetchData = async (page, reset = false) => {
    try {
      setLoading(true)
      const res = await fetchProducts({ category: categoryId, search: searchQuery, page })

      if (res.length === 0) {
        setNoMoreProducts(true)
      }

      const newProducts = res.filter(
        (newProduct) => !products.some((product) => product.id === newProduct.id)
      )

      if (reset) {
        setProducts(newProducts)
      } else {
        setProducts((prevProducts) => [...prevProducts, ...newProducts])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setProducts([])
    setNoMoreProducts(false)
    pageRef.current = 1
    fetchData(pageRef.current, true)
  }, [categoryId, searchQuery])

  const handleLoadMore = () => {
    if (!noMoreProducts && !loading) {
      pageRef.current += 1
      fetchData(pageRef.current)
    }
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (viewMode === 'grid' ? <GridProductCard item={item} /> : <ProductCard item={item} />)}
      keyExtractor={(item) => item.id.toString()}
      numColumns={viewMode === 'grid' ? 2 : 1}
      key={viewMode === 'grid' ? 'grid' : 'list'}
      ListFooterComponent={
        loading && (
          <View style={{ padding: 20 }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  )
}

export default ProductListing
