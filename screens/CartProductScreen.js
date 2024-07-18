import React, { useState } from 'react'
import QuantitySelector from '../components/Picker/QuantitySelector'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Dropdown } from 'react-native-element-dropdown'

const CartProductScreen = ({ product }) => {
  const des = product.description
  const description = des?.replace(/<[^>]+>/g, '')

  const colors = product.gpf_data?.color || []
  const sizes = product.gpf_data?.size || []

  console.log(sizes, '????????????///')

  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState({})

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.text_container}>
            <Text style={styles.text}>Orange Summer</Text>
            <Text style={styles.text_price}>DKK :{product.price}</Text>
          </View>
          <View style={styles.inner_container}>
            <View style={styles.text_container}>
              <Text style={styles.inner_text}>Size</Text>
              <View style={styles.dropdownContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  itemTextStyle={styles.textColor}
                  data={sizes}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={sizes.length === 0 ? 'Not available' : 'Choose a size'}
                  value={selectedSize}
                  labelStyle={styles.labelStyle}
                  onChange={item => {
                    setSelectedSize(item.selectedSize)
                  }}
                />
              </View>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.inner_text}>Choose a Color</Text>
              <View style={styles.dropdownContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  itemTextStyle={styles.textColor}
                  data={colors}
                  maxHeight={300}
                  labelField="label"
                  valueField="selectedColor"
                  placeholder={colors.length === 0 ? 'Not available' : 'Choose a color'}
                  value={selectedColor}
                  onChange={item => {
                    setSelectedColor(item.selectedColor)
                  }}
                />
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
                  <Text style={styles.inner_text}>Description</Text>
                }
                <Text style={styles.loremText}>
                  {description}
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
    backgroundColor: 'white'
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
    fontSize: 15,
    color: '#363636'
  },
  inner_container: {
    marginTop: verticalScale(20)
  },
  buttonContainer: {
    width: '95%',
    height: moderateScale(65),
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#7BCFE9',
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
    lineHeight: 22,
    color: 'black'
  },
  dropdownContainer: {
    width: verticalScale(150)
  },
  dropdown: {
    margin: moderateScale(8),
    height: verticalScale(35),
    backgroundColor: 'white',
    borderRadius: 12,
    color: 'black',
    padding: 12,
    shadowColor: 'black',
    width: verticalScale(140),
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  icon: {
    marginRight: 5
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: 'black'
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black'

  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black'

  },
  labelStyle: {
    fontSize: 16,
    textAlign: 'left',
    color: 'red'
  },
  textColor: {
    color: 'black'
  }

})

export default CartProductScreen
