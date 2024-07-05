import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import MenuCategoryPicker from '../../components/Picker/MenuCategory'
import ProductListing from '../../components/Product'

import Icon from 'react-native-vector-icons/Ionicons'

const ProductListingScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryId, setCategoryId] = useState(null)
  const [viewMode, setViewMode] = useState('list')

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
          <Image
            source={require('../../assets/images/slider.png')}
            style={styles.filterImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.pickerContainer}>
        <MenuCategoryPicker
          all={true}
          selection={false}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
      </View>
      <View style={styles.grid_conatiner}>
        <View>
          <Text style={styles.popular_text}>
            Popular
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <TouchableOpacity onPress={() => setViewMode('list')}>
              <Icon
                name='list'
                size={30}
                color={viewMode === 'list' ? 'black' : 'gray'}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 8 }}>
            <TouchableOpacity onPress={() => setViewMode('grid')}>
              <Icon
                name='grid'
                size={27}
                color={viewMode === 'grid' ? 'black' : 'gray'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.productContainer}>
        <ProductListing categoryId={categoryId} searchQuery={searchQuery} viewMode={viewMode} />
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
    flex: 1
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
    borderRadius: 50
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16
  },
  pickerContainer: {
    marginTop: 10,
    paddingHorizontal: 30
  },
  productContainer: {
    marginTop: 0,
    paddingHorizontal: 30,
    marginBottom: 10,
    height: '70%'
  },
  popular_text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500'
  },
  grid_conatiner: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 30,
    padding: 20,
    justifyContent: 'space-between'
  },
  filterImage: {
    width: 25
  }
})

export default ProductListingScreen
