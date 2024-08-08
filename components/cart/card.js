import React, { useState } from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'
import QuantitySelector from '../Picker/QuantitySelector'
import Icon from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const CartCard = ({ item, onDelete, setaddToCart }) => {
  const { imageUrl, price, color, size, name, quantity } = item
  const [currentQuantity, setCurrentQuantity] = useState(quantity)
  const handleQuantityChange = (newQuantity) => {
    setCurrentQuantity(newQuantity)
    setaddToCart(prevCartData =>
      prevCartData.map(cartItem =>
        cartItem.product_id === item.product_id && cartItem.color === item.color && cartItem.size === item.size
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    )
  }

  const calculateSubtotal = (currentQuantity, price) => {
    return (currentQuantity * price).toFixed(2)
  }
  const subtotal = calculateSubtotal(currentQuantity, price)

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <View style={styles.card}>
          <View style={styles.imageSection}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
            />
          </View>
          <View style={styles.textSection}>
            <Text style={styles.text2}>
              {name}
            </Text>
            <Text style={styles.text1}>
             Color: {color || 'not available'}
            </Text>
            <Text style={styles.text1}>
              Size:{size}
            </Text>
            <Text style={styles.text2}>
              {price}DKK
            </Text>
            <QuantitySelector selectQuantity={currentQuantity} quantityChange={handleQuantityChange} />
          </View>
        </View>
        <TouchableOpacity onPress={onDelete} >
          <View style={styles.icon}>
            <Icon
              name='delete'
              size={18}
              color='black'
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.line_container}>
        <View style={styles.line} />
      </View>
      <View style={styles.sub_total}>
        <Text style={styles.text3}>Sub Total : {subtotal}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inner_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: moderateScale(8)
  },
  container: {
    backgroundColor: 'white',
    paddingBottom: verticalScale(20),
    marginTop: verticalScale(10)
  },
  card: {
    flex: 1,
    height: 'auto',
    flexDirection: 'row',
    marginTop: verticalScale(10),
    marginLeft: moderateScale(30),
    borderRadius: moderateScale(10)
  },
  imageSection: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSection: {
    flex: 2,
    paddingLeft: moderateScale(10)
  },
  image: {
    width: moderateScale(110),
    height: verticalScale(110),
    borderRadius: moderateScale(10)
  },
  text1: {
    fontSize: moderateScale(15),
    color: '#7A8D9C'
  },
  text2: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    color: 'black',
    width: moderateScale(160)
  },
  text3: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    color: 'black'
  },
  line: {
    height: verticalScale(1),
    backgroundColor: 'black',
    width: '90%',
    marginVertical: verticalScale(10)
  },
  line_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sub_total: {
    display: 'flex',
    alignSelf: 'flex-end',
    paddingRight: moderateScale(15)
  }
})

export default CartCard
