import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { fetchProducts } from '../../services/product'

import ProductCard from '../../components/Product/card'

const CardListing = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchProducts()
        setProducts(res)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchData()
  }, [])

  const renderItem = ({ item }) => {
    return (
      <ProductCard
        item={item}
      />
    )
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}

export default CardListing
