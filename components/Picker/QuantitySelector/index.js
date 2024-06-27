import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => setQuantity(quantity + 1)
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1)

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
    alignItems: 'center'
  },
  button: {
    width: 35,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  quantity: {
    marginHorizontal: 5,
    padding: 5,
    fontSize: 20
  }

})

export default QuantitySelector
