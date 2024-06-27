import React, { useState } from 'react'
import QuantitySelector from '../components/Picker/QuantitySelector'
import { Rating } from 'react-native-ratings'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

const CartScreen = () => {
  const sizes = [
    { id: '1', size: 'S' },
    { id: '2', size: 'M' },
    { id: '3', size: 'L' },
    { id: '4', size: 'XL' }
  ]
  const [selectedSize, setSelectedSize] = useState(null)

  const handleSelect = (id) => {
    setSelectedSize(id)
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

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.text_container}>
            <Text style={styles.text}>Orange Summer</Text>
            <Text style={styles.text_price}>$97</Text>
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
              <Text style={styles.text_price}>$97</Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.inner_text}>Select Quantity</Text>
              <QuantitySelector />
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
    padding: 30,
    backgroundColor: 'gray'
  },
  card: {
    backgroundColor: 'white',
    width: 100,
    height: 100
  },
  text: {
    fontSize: 20
  },
  text_price: {
    fontSize: 30,
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
    marginTop: 30
  },
  buttonContainer: {
    width: '95%',
    height: 65,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#126881',
    justifyContent: 'center'
  },
  button_container_hold: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 100
  },
  button: {
    margin: 5,
    padding: 5,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    color: 'white'
  },
  buttonSelected: {
    backgroundColor: 'blue'
  },
  scrollContainer: {
    flexDirection: 'row',
    marginTop: 10
  }
})

export default CartScreen
