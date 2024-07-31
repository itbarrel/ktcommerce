import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const QuantitySelector = ({ quantityChange, selectQuantity }) => {
  const [quantity, setQuantity] = useState(selectQuantity)

  const increaseQuantity = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    quantityChange(newQuantity)
  }

  const decreaseQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1
    setQuantity(newQuantity)
    quantityChange(newQuantity)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: moderateScale(110),
    alignItems: 'center'
  },
  button: {
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

export default QuantitySelector
