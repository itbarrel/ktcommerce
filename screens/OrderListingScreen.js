import React, { useEffect, useState } from 'react'
import { fetchAllOrder } from '../services/order'
import OrderCard from '../components/Order/card'
import { useNavigation } from '@react-navigation/native'
import { getId } from '../utils/storage'
import { FlatList } from 'react-native'

const OrderListingScreen = () => {
  const [orders, setOrder] = useState([])
  const navigation = useNavigation()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await getId()
        if (id) {
          const response = await fetchAllOrder(id)
          setOrder(response)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const renderItem = ({ item }) => {
    return item.line_items.map((lineItem, index) => {
      const handlePress = () => {
        const variationId = lineItem.variation_id
        const productId = lineItem.product_id

        navigation.navigate('VariationDetailScreen', {
          variationId,
          productId
        })
      }

      return (
        <OrderCard
          key={`${item.id}-${index}`}
          item={item}
          lineItem={lineItem}
          onPress={handlePress}
        />
      )
    })
  }
  return (
    <>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  )
}

export default OrderListingScreen
