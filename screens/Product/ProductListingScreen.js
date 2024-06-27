import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import MenuCategoryPicker from '../../components/Picker/MenuCategory'
import ProductListing from '../../components/Product'

const ProductListingScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryId, setCategoryId] = useState(null)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Searchbar
            style={styles.search}
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
        <View></View>
      </View>
      <View>
        <MenuCategoryPicker
          all={true} selection={false}
          categoryId={categoryId} setCategoryId={setCategoryId}
        />
      </View>
      <View>
        <ProductListing categoryId={categoryId}/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 30
  },
  searchContainer: {
    flex: 1 // Take remaining space
  },
  search: {
    width: '100%'
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: 'black',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 20
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16
  }
})

export default ProductListingScreen
