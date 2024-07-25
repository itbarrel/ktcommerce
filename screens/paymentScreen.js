import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const PaymentScreen = () => {
  const slideItems = [
    {
      key: '1',
      image: require('../assets/images/images.jpeg'),
      backgroundColor: '#a3c9a8'
    }

  ]
  return (
    <View>

      <View style={styles.container}>
        <View style={styles.inner_container}>
          <View style={styles.location}>
            <Icon
              name='location-pin'
              size={20}
            />
            <Text>Shipping Address</Text>
          </View>
          <View>
            <Text>Edit</Text>
          </View>
        </View>
        <View style={styles.line_container}>
          <View style={styles.line} />
        </View>
        <View style={styles.textSection}>
          <Text style={styles.text2}>
           Lewis Jens
          </Text>
          <Text style={styles.text1}>
          CaPtornia Stace, Blok 4F No.S
          </Text>
          <Text style={styles.text1}>
          Calnermial
          </Text>
          <Text style={styles.text2}>
          0214-0000-0000
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.inner_container}>
        </View>
        <View style={styles.card}>
          <View style={styles.imageSection}>
            <Image
              source={slideItems[0].image}
              style={styles.image}
            />
          </View>
          <View style={styles.textSection}>
            <Text style={styles.text2}>
           Lewis Jens
            </Text>
            <Text style={styles.text1}>
            Color: Dark Grey | Sure: L
            </Text>
            <Text style={styles.text2}>
         $76
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.inner_container}>
          <View style={styles.location}>
            <Text>Delivery Service</Text>
          </View>
          <View>
            <Text>Edit</Text>
          </View>
        </View>
        <View style={styles.line_container}>
          <View style={styles.line} />
        </View>
        <View style={styles.inner_container}>
          <View style={styles.location}>
            <Text style={styles.text2}>Express Delivery</Text>
          </View>
          <View>
            <Text style={styles.text2}>$2</Text>
          </View>
        </View>

      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'gray',
    marginTop: 15
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
    marginVertical: 10

  },
  line_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  location: {
    flexDirection: 'row'
  },
  inner_container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'

  },
  textSection: {
    padding: 4
  },
  text1: {
    fontSize: 15
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 15
  },
  card: {
    width: 320,
    height: 'auto',
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 5
  },
  image: {
    width: 100,
    height: 100
  },
  express_text:
  {
    paddingLeft: 14
  }

})
export default PaymentScreen
