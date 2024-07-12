import React, { useEffect, useState } from 'react'
import {
  ScrollView, StyleSheet
  , View, ActivityIndicator
} from 'react-native'

import { fetchMenus } from '../../../services/product'
import CategoryCard from './card'

const MenuCategoryPicker = ({ all, selection, categoryId, setCategoryId }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const allFilter = {
    id: 0,
    name: 'All'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMenus()
        setCategories(all ? [allFilter, ...response] : response)
        setLoading(false)
      } catch (error) {
        console.error('Error>>>>>>>>>>> fetching product:', error)
      }
    }

    fetchData()
  }, [all])

  const handleSelect = (id) => {
    setCategoryId(id)
  }
  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.buttonContainer}>
        {categories.map((item) => (
          <CategoryCard key={item.ID}
            item={item}
            isSelected={item.ID === categoryId}
            onSelect={() => handleSelect(item.ID)}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'flex-start'
  },
  text: {
    fontSize: 12,
    color: 'black'
  }

})

export default MenuCategoryPicker
