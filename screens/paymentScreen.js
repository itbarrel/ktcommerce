import React from 'react'
import { View, StyleSheet, Text, Image, TextInput, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import WalletIcon from 'react-native-vector-icons/AntDesign'

import { moderateScale, verticalScale } from 'react-native-size-matters'

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
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.inner_container}>
            <View style={styles.location}>
              <Icon
                name='location-pin'
                size={moderateScale(20)}
                color="#7A8D9C"
              />
              <Text style={styles.black_text}>Shipping Address</Text>
            </View>
            <View>
              <Text style={styles.black_text}>Edit</Text>
            </View>
          </View>
          <View style={styles.line_container}>
            <View style={styles.line} />
          </View>
          <View style={styles.textSection}>
            <Text style={styles.bold_text}>
              Lewis Jens
            </Text>
            <Text style={styles.black_text}>
              CaPtornia Stace, Blok 4F No.S
            </Text>
            <Text style={styles.black_text}>
              Calnermial
            </Text>
            <Text style={styles.bold_text}>
              0214-0000-0000
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.inner_container}></View>
          <View style={styles.card}>
            <View style={styles.imageSection}>
              <Image
                source={slideItems[0].image}
                style={styles.image}
              />
            </View>
            <View style={styles.textSection}>
              <Text style={styles.bold_text}>
                Lewis Jens
              </Text>
              <Text style={styles.black_text}>
                Color: Dark Grey | Sure: L
              </Text>
              <Text style={styles.bold_text}>
                $76
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.inner_container}>
            <View style={styles.location}>
              <Text style={styles.black_text}>Delivery Service</Text>
            </View>
            <View>
              <Text style={styles.black_text}>Edit</Text>
            </View>
          </View>
          <View style={styles.line_container}>
            <View style={styles.line} />
          </View>
          <View style={styles.inner_container}>
            <View style={styles.location}>
              <Text style={styles.bold_text}>Express Delivery</Text>
            </View>
            <View>
              <Text style={styles.bold_text}>$2</Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.description}>Add Description</Text>
          <TextInput
            style={styles.input}
            multiline={true}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.inner_container}>
            <View style={styles.location}>
              <Text style={styles.black_text}>
                Payment Method
              </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <WalletIcon
                name='wallet'
                size={moderateScale(18)}
                color='#7A8D9C'
              />
              <Text style={styles.pay_text}>My Pay</Text>
              <WalletIcon
                name='rightcircle'
                size={moderateScale(18)}
                color='#7A8D9C'
              />
            </View>
          </View>
          <View style={styles.line_container}>
            <View style={styles.line} />
          </View>
          <View style={styles.inner_container}>
            <View style={styles.location}>
              <Text style={styles.black_text}>
                Subtotals for product
              </Text>
            </View>
            <View>
              <Text style={styles.black_text}>$2</Text>
            </View>
          </View>
          <View style={styles.inner_container}>
            <View style={styles.location}>
              <Text style={styles.black_text}>
                Subtotals for shipping
              </Text>
            </View>
            <View>
              <Text style={styles.black_text}>$2</Text>
            </View>
          </View>
          <View style={styles.inner_container}>
            <View style={styles.location}>
              <Text style={styles.bold_text}>Total Payment</Text>
            </View>
            <View>
              <Text style={styles.black_text}>$2</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(15),
    backgroundColor: 'white',
    marginTop: verticalScale(15)
  },
  line: {
    height: verticalScale(1),
    backgroundColor: 'black',
    width: '100%',
    marginVertical: verticalScale(10)
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
    padding: moderateScale(4)
  },
  black_text: {
    fontSize: moderateScale(15),
    color: '#7A8D9C'
  },
  bold_text: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    color: '#7A8D9C'
  },
  card: {
    width: moderateScale(320),
    height: 'auto',
    flexDirection: 'row',
    marginTop: verticalScale(10),
    borderRadius: moderateScale(5)
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100)
  },
  express_text: {
    paddingLeft: moderateScale(14)
  },
  input: {
    padding: moderateScale(30),
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.8,
    shadowRadius: moderateScale(2),
    elevation: 5,
    margin: moderateScale(10),
    color: 'black'
  },
  description: {
    marginLeft: moderateScale(10),
    color: 'black'
  },
  pay_text: {
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(5),
    color: '#7A8D9C'
  }
})

export default PaymentScreen
