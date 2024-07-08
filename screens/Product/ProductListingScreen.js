import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import MenuCategoryPicker from '../../components/Picker/MenuCategory'
import ProductListing from '../../components/Product'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { ScrollView } from 'react-native-gesture-handler'

const ProductListingScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryId, setCategoryId] = useState(null)
  const [viewMode, setViewMode] = useState('list')
  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

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
        <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
          <Image
            source={require('../../assets/images/slider.png')}
            style={styles.filterImage}
          />
        </TouchableOpacity>

      </View>

      <View style={styles.grid_container}>
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

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={closeModal}
        onSwipeComplete={toggleModal}
        swipeDirection="left"
        animationIn="bounceInLeft"
        animationOut="slideOutUp"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.Modal}
      >
        <View style={styles.modalContent}>
          <ScrollView>
            <View style={styles.pickerContainer}>
              <MenuCategoryPicker
                all={true}
                selection={false}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(30)
  },
  searchContainer: {
    flex: 1
  },
  search: {
    width: '100%'
  },
  filterButton: {
    marginLeft: moderateScale(10),
    backgroundColor: 'black',
    height: verticalScale(50),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(15),
    borderRadius: verticalScale(50)
  },
  filterButtonText: {
    color: 'white',
    fontSize: moderateScale(16)
  },
  pickerContainer: {
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(30)
  },
  productContainer: {
    marginTop: 0,
    paddingHorizontal: moderateScale(30),
    marginBottom: verticalScale(10),
    height: '70%'
  },
  popular_text: {
    color: 'black',
    fontSize: moderateScale(20),
    fontWeight: '500'
  },
  grid_container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(30),
    paddingVertical: verticalScale(20),
    justifyContent: 'space-between'
  },
  filterImage: {
    width: moderateScale(25)
  },
  Modal: {
    margin: 0,
    justifyContent: 'flex-start'
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: verticalScale(12),
    display: 'flex',
    minHeight: verticalScale(600),
    paddingBottom: verticalScale(20),
    justifyContent: 'flex-start',
    width: verticalScale(290)
  }
})

export default ProductListingScreen
