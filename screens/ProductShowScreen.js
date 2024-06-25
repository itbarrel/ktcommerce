import React from 'react'
import { Searchbar } from 'react-native-paper'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import MultipleEventTypePicker from '../components/Picker/MultipleCategoryPicker'
import CardListing from '../components/Product'

const ProductShowScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('')

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
        <View>

        </View>

      </View>
      <View>
        <MultipleEventTypePicker/>

      </View>
      <View>
        <CardListing/>
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

export default ProductShowScreen
