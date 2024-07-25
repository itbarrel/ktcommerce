import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Dropdown } from 'react-native-element-dropdown'
import RenderHTML from 'react-native-render-html'
import { useNavigation } from '@react-navigation/native'

const CartProductScreen = ({ product, setaddToCart }) => {
  const { id, price, name } = product
  const imageUrl = product?.images?.[0]?.src || ''

  const navigation = useNavigation()
  const CartNavigate = () => {
    navigation.navigate('CartListing')
  }
  const { width } = Dimensions.get('window')
  const colors = product.attributes?.map(att => att.options)[1] || []
  const sizes = product.attributes?.map(att => att.options)[0] || []
  const sizesOptions = sizes.map((item) => ({ label: item, value: item }))
  const colorsOptions = colors.map((item) => ({ label: item, value: item }))
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => setQuantity(quantity + 1)
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1)

  const handleSelect = () => {
    setaddToCart(prevArray => {
      const existingItem = prevArray.find(cartItem => cartItem.id === id)

      if (existingItem && (existingItem.size !== selectedSize || existingItem.color !== selectedColor || existingItem.quantity !== quantity)) {
        const newItem = {
          size: selectedSize,
          color: selectedColor,
          id,
          imageUrl,
          price,
          quantity,
          name
        }

        return [...prevArray, newItem]
      } else if (!existingItem) {
        const newItem = {
          size: selectedSize,
          color: selectedColor,
          id,
          imageUrl,
          price,
          quantity,
          name
        }

        return [...prevArray, newItem]
      }
      return prevArray
    })
    setTimeout(() => {
      CartNavigate()
    }, 0)
  }

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
                  data={sizesOptions}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={sizes.length === 0 ? 'Not available' : 'Choose size'}
                  value={selectedSize}
                  labelStyle={styles.labelStyle}
                  onChange={item => {
                    setSelectedSize(item.value)
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
                  data={colorsOptions}
                  maxHeight={100}
                  labelField="label"
                  valueField="value"
                  placeholder={colors.length === 0 ? 'Not available' : 'Choose color'}
                  value={selectedColor}
                  onChange={item => {
                    setSelectedColor(item.value)
                  }}
                />
              </View>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.inner_text}>Select Quantity</Text>
              <View style={styles.container1}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.quan_button}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.quan_button}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View>
                {product.description && (
                  <>
                    <Text style={styles.inner_text}>Description:</Text>
                    <RenderHTML
                      contentWidth={width}
                      source={{ html: product.description }}
                      baseStyle={styles.htmlContent}
                    />
                  </>
                )}

              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={handleSelect}>
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
    color: '#363636',
    fontWeight: 'bold'
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
    color: 'black',
    marginTop: 20,
    width: 10
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
  },
  htmlContent: {
    color: '#000', // Set your desired text color
    fontSize: 16 // Set your desired font size
    // Add more styles as needed
  },
  container1: {
    flexDirection: 'row',
    width: moderateScale(110),
    alignItems: 'center'
  },
  quan_button: {
    width: moderateScale(35),
    height: verticalScale(27),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  buttonText: {
    fontSize: moderateScale(20),
    fontWeight: 'bold'
  },
  quantity: {
    marginHorizontal: moderateScale(5),
    padding: moderateScale(5),
    fontSize: moderateScale(20),
    color: 'black'
  }

})

export default CartProductScreen
