import React, { useContext, useState, useEffect } from 'react'
import { FlatList, View, ActivityIndicator, Text } from 'react-native'
import GridProductCard from './gridCard'
import { ProductContext } from '../../Provider/product'
import ProductCard from './card'

const ProductListing = ({ searchQuery, viewMode, categoryId }) => {
  const { products, loading, handleLoadMore, fetchAllProducts } = useContext(ProductContext)
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    fetchAllProducts(1, true, categoryId)
  }, [categoryId])

  useEffect(() => {
    const filtered = products.filter((product) => {
      const nameMatches = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const idMatches = `${product.id}`.includes(searchQuery)
      const optionsMatch = product.attributes.some((attribute) =>

        attribute.options.some((option) =>
          option.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )

      return nameMatches || idMatches || optionsMatch
    })

    setFilteredProducts(filtered)
  }, [products, searchQuery])

  return (
    <View style={{ flex: 1 }}>
      {filteredProducts.length === 0 && !loading
        ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: 'gray' }}>Product Not Available</Text>
          </View>
        )
        : (
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) =>
              viewMode === 'grid' ? <GridProductCard item={item} /> : <ProductCard item={item} />
            }
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
            onEndReached={() => handleLoadMore(categoryId)}
            onEndReachedThreshold={0.5}
          />
        )}
    </View>
  )
}

export default ProductListing
