import React, { useEffect, useState } from 'react'
import { fetchAllOrder } from '../services/order'
import OrderCard from '../components/Order/card'
import { getId } from '../utils/storage'
import { FlatList } from 'react-native'

const OrderListingScreen = () => {
  const [orders, setOrder] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await getId()
        if (id) {
          const response = await fetchAllOrder(id)
          console.log(response, '>>>>>>>>..')

          setOrder(response)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const renderItem = ({ item }) => {
    return (
      <OrderCard
        item={item}
      />
    )
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
