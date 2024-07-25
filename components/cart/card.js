import React, { useState } from 'react'
import { Checkbox } from 'react-native-paper'
import { Text, Image, View, StyleSheet } from 'react-native'
import QuantitySelector from '../Picker/QuantitySelector'
import Icon from 'react-native-vector-icons/AntDesign'

const CartCard = ({ item }) => {
  const { imageUrl, price, color, size, name } = item
  const quantityCahnge = (item.quantity)
  const [checked, setChecked] = useState(false)
  const handleCheckboxToggle = () => {
    setChecked(!checked)
  }
  const calculateSubtotal = (quantityCahnge, price) => {
    return (quantityCahnge * price).toFixed(2)
  }
  const subtotal = calculateSubtotal(quantityCahnge, price)

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <View style={styles.check_box}>
          <Checkbox
            style={styles.check}
            status={checked ? 'checked' : 'unchecked'}
            onPress={handleCheckboxToggle}
          />
        </View>
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
              Price:{price}DKK
            </Text>
            <QuantitySelector quantityCahnge={quantityCahnge} />
          </View>
        </View>

        <View style={styles.icon}>
          <Icon
            name='delete'
            size={18}
            color='black'
          />
        </View>
      </View>
      <View style={styles.line_container}>
        <View style={styles.line} />
      </View>
      <View style={styles.sub_total}>
        <Text style={styles.text2}>Sub Total : {subtotal}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inner_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 8
  },
  container: {
    backgroundColor: 'white',
    paddingBottom: 20,
    marginTop: 10
  },
  card: {
    flex: 1,
    width: 300,
    height: 'auto',
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10
  },
  imageSection: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSection: {
    flex: 2,
    paddingLeft: 10
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10
  },
  text1: {
    fontSize: 15,
    color: 'black'
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black'

  },
  check_box: {
    display: 'flex',
    justifyContent: 'center'
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    width: '90%',
    marginVertical: 10

  },
  line_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sub_total: {
    display: 'flex',
    alignSelf: 'flex-end',
    paddingRight: 15
  }
})

export default CartCard
