import React, { useContext } from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Text, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CartContext } from '../../Provider/cart'
import { getUser } from '../../utils/storage'
import CartCard from './card'

const CartCardListing = (props) => {
  const { addToCart, setaddToCart } = useContext(CartContext)
  const allItems = addToCart
  const navigation = useNavigation()
  const handleNavigate = async () => {
    try {
      const user = await getUser()
      if (user) {
        navigation.navigate('PaymentScreen', { allItems, totalProductPrice })
      } else {
        navigation.navigate('LoginScreen')
      }
    } catch (error) {
      console.error('Error retrieving user data', error)
    }
  }
  // eslint-disable-next-line camelcase
  const handleDelete = (product_id, size, color, quantity) => {
    // eslint-disable-next-line camelcase
    const newCartData = addToCart.filter(item => !(item.product_id === product_id && item.size === size && item.color === color && item.quantity === quantity))
    setaddToCart(newCartData)
  }

  const totalProductPrice = allItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity)
  }, 0)

  return (
    <View style={styles.container}>
      <FlatList
        data={addToCart}
        renderItem={({ item }) => <CartCard item={item}
          setaddToCart={setaddToCart}
          onDelete={() => handleDelete(item.product_id, item.size, item.color, item.quantity)}
        />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.cartContainer}
      />
      <View style={styles.checkoutContainer}>
        <View style={styles.inner_checkout}>
          <View><Text style={styles.total_price}>Subtotal</Text></View>
          <View><Text style={styles.total_price}>{totalProductPrice}DKK</Text></View>
        </View>
        <TouchableOpacity onPress={handleNavigate}
          style={styles.buttonContainer}>
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
