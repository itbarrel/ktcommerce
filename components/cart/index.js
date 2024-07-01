import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import CartCard from './card'

const CartListing = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cartContainer}>
        <CartCard />
      </View>
      <View style={styles.checkoutContainer}>
        <View style={styles.inner_checkout}>
          <View><Text>SubTotal</Text></View>
          <View><Text style={styles.total_price}>$152</Text></View>
        </View>
        <TouchableOpacity>
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
    justifyContent: 'space-between'
  },
  cartContainer: {
    flex: 1,
    paddingTop: verticalScale(20)
  },
  checkoutContainer: {
    padding: verticalScale(25),
    backgroundColor: 'gray',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  buttonContainer: {
    width: '100%',
    height: moderateScale(55),
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
    fontSize: 20
  }

})

export default CartListing
