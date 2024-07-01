import React, { useState } from 'react'
import QuantitySelector from '../components/Picker/QuantitySelector'
import { Rating } from 'react-native-ratings'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const CartProductScreen = ({ product }) => {
  const sizes = [
    { id: '1', size: 'S' },
    { id: '2', size: 'M' },
    { id: '3', size: 'L' },
    { id: '4', size: 'XL' }
  ]
  const colors = [
    { id: '5', color: '' },
    { id: '6', color: '' },
    { id: '7', color: '' },
    { id: '8', color: '' }
  ]
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)

  const handleSelect = (id) => {
    setSelectedSize(id)
  }
  const handleColorSelect = (id) => {
    setSelectedColor(id)
  }

  const renderItem = (item) => (
    <View key={item.id}>
      <TouchableOpacity onPress={() => handleSelect(item.id)}>
        <Text style={[
          styles.button,
          selectedSize === item.id && styles.buttonSelected
        ]}>
          {item.size}
        </Text>
      </TouchableOpacity>
    </View>
  )

  const renderItemColor = (item) => (
    <View key={item.id}>
      <TouchableOpacity onPress={() => handleColorSelect(item.id)}>
        <Text style={[
          styles.buttonColor,
          selectedColor === item.id && { borderColor: 'blue' } // Change border color on selection
        ]}>
          {item.color}
        </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.text_container}>
            <Text style={styles.text}>Orange Summer</Text>
            <Text style={styles.text_price}>DKK :{product.price}</Text>
          </View>
          <View style={styles.text_container}>
            <Rating
              ratingColor='#F0C30E'
              ratingCount={5}
              imageSize={25}
              style={{ paddingVertical: 10 }}
            />
          </View>
          <View style={styles.inner_container}>
            <View style={styles.text_container}>
              <Text style={styles.inner_text}>Size</Text>
              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.scrollContainer}>
                    {sizes.map(renderItem)}
                  </View>
                </ScrollView>
              </View>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.inner_text}>Choose a Color</Text>
              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.scrollContainer}>
                    {colors.map(renderItemColor)}
                  </View>
                </ScrollView>
              </View>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.inner_text}>Select Quantity</Text>
              <QuantitySelector />
            </View>
            <View>
              <View>
                {
                  product.description &&
                  <Text style={styles.inner_text}>Discription</Text>
                }
                <Text style={styles.loremText}>
                  {product.description}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <View style={styles.button_container_hold}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.text_cart}>Add to Cart</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(30),
    backgroundColor: 'gray'
  },

  text: {
    fontSize: 20
  },
  text_price: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'right'
  },
  text_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  inner_text: {
    fontSize: 15
  },
  inner_container: {
    marginTop: verticalScale(20)
  },
  buttonContainer: {
    width: '95%',
    height: moderateScale(65),
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#126881',
    justifyContent: 'center'
  },
  button_container_hold: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30)
  },
  button: {
    margin: 5,
    height: moderateScale(25),
    width: moderateScale(25),
    backgroundColor: 'black',
    borderRadius: 5,
    display: 'flex',
    color: 'white',
    textAlign: 'center'
  },
  buttonColor: {
    margin: 5,
    height: moderateScale(25),
    width: moderateScale(25),
    backgroundColor: 'black',
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    color: 'white'
  },
  buttonSelected: {
    backgroundColor: 'blue'
  },
  scrollContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10)
  },
  loremText: {
    fontSize: 16,
    lineHeight: 22
  }
})

export default CartProductScreen
