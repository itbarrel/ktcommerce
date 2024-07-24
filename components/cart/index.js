import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Text, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native'
import CartCard from './card'

const CartCardListing = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cartContainer}>
          <CartCard />
          <CartCard />
          <CartCard />

        </View>
      </ScrollView>
      <View style={styles.checkoutContainer}>
        <View style={styles.inner_checkout}>
          <View><Text style={styles.total_price}>Subtotal</Text></View>
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
    color: 'black'
  }

})

export default CartCardListing
