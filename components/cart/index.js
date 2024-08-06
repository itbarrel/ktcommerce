import React, { useState } from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Text, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CartCard from './card'

const CartCardListing = (props) => {
  const [cartData, setCartData] = useState(props.route.params.addToCart)
  console.log(cartData, 'ppppppp')

  const navigation = useNavigation()
  const handlenavigate = () => {
    const checkedItems = cartData.filter(item => item.checked)
    navigation.navigate('PaymentScreen', { checkedItems, totalCheckedPrice })
  }

  // eslint-disable-next-line camelcase
  const handleDelete = (product_id, size, color, quantity) => {
    // eslint-disable-next-line camelcase
    const newCartData = cartData.filter(item => !(item.product_id === product_id && item.size === size && item.color === color && item.quantity === quantity))
    setCartData(newCartData)
  }

  const calculateTotalCheckedPrice = (data) => {
    return data
      .filter(item => item.checked)
      .map(item => parseFloat(item.price) * item.quantity)
      .reduce((acc, total) => acc + total, 0)
  }
  const isAtLeastOneItemChecked = () => {
    return cartData.some(item => item.checked)
  }

  const totalCheckedPrice = calculateTotalCheckedPrice(cartData)

  return (
    <View style={styles.container}>
      <FlatList
        data={cartData}
        renderItem={({ item }) => <CartCard item={item}
          setCartData={setCartData}
          onDelete={() => handleDelete(item.product_id, item.size, item.color, item.quantity)}
        />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.cartContainer}
      />
      <View style={styles.checkoutContainer}>
        <View style={styles.inner_checkout}>
          <View><Text style={styles.total_price}>Subtotal</Text></View>
          <View><Text style={styles.total_price}>{totalCheckedPrice}DKK</Text></View>
        </View>
        <TouchableOpacity onPress={handlenavigate}
          disabled={!isAtLeastOneItemChecked()}
          style={[styles.buttonContainer, !isAtLeastOneItemChecked() && styles.disabledButton]}>
          <View style={styles.buttonContainer}>
            <Text style={styles.textCart}>CHECK OUT</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  cartContainer: {
    paddingTop: verticalScale(20),
    paddingBottom: 30
  },
  checkoutContainer: {
    padding: verticalScale(20),
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#f0efee',
    borderWidth: 3
  },
  buttonContainer: {
    width: '100%',
    height: moderateScale(45),
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#126881',
    justifyContent: 'center'
  },
  textCart: {
    color: 'white',
    fontSize: 17
  },
  inner_checkout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10)
  },
  total_price: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold'
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: '#ccc'
  }
})

export default CartCardListing
