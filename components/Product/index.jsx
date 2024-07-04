import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { fetchProducts } from '../../services/product'

import ProductCard from './card'

const ProductListing = ({ categoryId, searchQuery }) => {
  const [products, setProducts] = useState([])

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
      renderItem={({ item }) => (<ProductCard item={item}/>)}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}

export default ProductListing
