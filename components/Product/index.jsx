import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { fetchProducts } from '../../services/product'
import GridProductCard from './gridCard'

import ProductCard from './card'

const ProductListing = ({ categoryId, searchQuery, viewMode }) => {
  const [products, setProducts] = useState([])
  const numColumns = 2
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchProducts({ category: categoryId, search: searchQuery })
        setProducts(res)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchData()
  }, [categoryId, searchQuery])

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (viewMode === 'grid' ? <GridProductCard item={item} /> : <ProductCard item={item} />)}
      keyExtractor={(item) => item.id.toString()}
      numColumns={viewMode === 'grid' ? 2 : 1}
      key={viewMode === 'grid' ? 'grid' : 'list'}
    />
  )
}

export default ProductListing
