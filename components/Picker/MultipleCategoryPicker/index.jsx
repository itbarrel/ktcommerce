import React, { useEffect, useState } from 'react'
import {
  ScrollView, StyleSheet
  , View
} from 'react-native'

import { fetchMenus } from '../../../services/product'
import CategoryCard from './Card'

const MultipleEventTypePicker = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchMenus()
        setCategories(res.items)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchData()
  }, [])

  const handleSelect = (id) => {
    setSelectedCategoryId(id)
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.buttonContainer}>
        {categories.map((item) => (
          <CategoryCard key={item.ID}
            item={{ id: item.ID, title: item.title }}
            isSelected={item.ID === selectedCategoryId}
            onSelect={() => handleSelect(item.ID)}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    display: 'flex'
  },
  text: {
    fontSize: 12,
    color: 'black'
  }

})

export default MultipleEventTypePicker
