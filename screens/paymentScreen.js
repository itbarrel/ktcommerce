/* eslint-disable camelcase */
import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CrossIcon from 'react-native-vector-icons/Entypo'
import WalletIcon from 'react-native-vector-icons/AntDesign'
import Modal from 'react-native-modal'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { CreateOrder } from '../services/order'

const PaymentScreen = (props) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [address_1, setAddress_1] = useState('')
  const [address_2, setAddress_2] = useState('')
  const [state, setState] = useState('')
  const [code, setCode] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [user, setUser] = useState({})
  console.log(user, 'LLLLLL')

  const handleSubmit = () => {
    const updatedData = { first_name, last_name, phone: contact, address_1, address_2, state, postcode: code, city, country, email }
    setUser(updatedData)
    setFirstName('')
    setLastName('')
    setContact('')
    setAddress_1('')
    setAddress_2('')
    setState('')
    setCode('')
    setCity('')
    setCountry('')
    setEmail('')
    toggleModal()
  }
  const totalProductPrice = props.route.params.totalCheckedPrice
  const checkItem = props.route.params.checkedItems
  console.log(checkItem, '.........................')

  const toggleModal = () => {
    if (!isModalVisible) {
      setFirstName(user?.first_name || '')
      setLastName(user?.last_name || '')
      setContact(user?.phone || '')
      setEmail(user?.email || '')
      setAddress_1(user?.address_1 || '')
      setAddress_2(user?.address_2 || '')
      setState(user?.state || '')
      setCode(user?.postcode || '')
      setCity(user?.city || '')
      setCountry(user?.country || '')
    }
    setModalVisible(!isModalVisible)
  }

  const handlePlaceOrder = async () => {
    try {
      const lineItems = checkItem.map((item) => ({
        variation_id: item.variation_id,
        product_id: item.product_id,
        quantity: item.quantity
      }))

      console.log(lineItems)
      const payload = {
        billing: user,
        shipping: user,
        line_items: lineItems,
        shipping_lines: [
          {
            method_id: 'flat_rate',
            method_title: 'Flat Rate',
            total: '10.00'
          }
        ],
        payment_method: 'bacs',
        payment_method_title: 'Direct Bank Transfer',
        set_paid: true
      }
      const response = await CreateOrder(payload)
      console.log('Order placed successfully:', response)
    } catch (error) {
      console.log(error, 'erorrrrrrrrrrr')

      console.error('Error placing order:', error)
    }
  }

  const ProductCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageSection}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.textSection}>
        <Text style={styles.bold_text1}>{item.name}</Text>
        <Text style={styles.black_text}>Color: {item.color} | Size: {item.size}</Text>
        <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', width: 200 }}>
          <Text style={styles.bold_text}>DKK{item.price}</Text>
          <Text style={{ color: '#7A8D9C' }}>x{item.quantity}</Text>
        </View>
      </View>
    </View>
  )

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
            <TouchableOpacity onPress={toggleModal}>
              <View>
                <Text style={styles.black_text}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.line_container}>
            <View style={styles.line} />
          </View>
          <View style={styles.textSection}>
            <Text style={styles.bold_text}>
              {user?.first_name || 'FirstName'} {user?.last_name || 'LastName'}
            </Text>
            <Text style={styles.black_text}>
              {user?.address_1 || 'Address-1'}
            </Text>
            <Text style={styles.black_text}>
              {user?.address_2 || 'Address-2'}
            </Text>
            <Text style={styles.bold_text}>
              {user?.phone || 'Contact'}
            </Text>
            <Text style={styles.bold_text}>
              {user?.city || 'City'}
            </Text>
            <Text style={styles.bold_text}>
              {user?.state || 'State'}
            </Text>
            <Text style={styles.bold_text}>
              {user?.postcode || 'Postal Code'}
            </Text>
            <Text style={styles.bold_text}>
              {user?.country || 'Country'}
            </Text>
            <Text style={styles.bold_text}>
              {user?.email || 'Email'}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.inner_container1}>
            {checkItem.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.inner_container}>
            <View style={styles.location}>
              <Text style={styles.black_text}>Delivery Service</Text>
            </View>
            <View>
              <Text style={styles.black_text}>Shipmanod </Text>
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
              <Text style={styles.black_text}>DKK{totalProductPrice}</Text>
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
        <View>
          <TouchableOpacity onPress={handlePlaceOrder}>
            <View style={styles.button_container_hold}>
              <View style={styles.buttonContainer}>
                <Text style={styles.text_cart}>Place Order</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInUp"
        animationOut="slideOutUp"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.Modal}

      >
        <View style={styles.modalContent}>
          <View style={{ marginLeft: moderateScale(270), marginTop: verticalScale(-20) }}>
            <TouchableOpacity onPress={toggleModal}>
              <CrossIcon
                name='cross'
                size={moderateScale(20)}
                color="#7A8D9C"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.shipping_container}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <TextInput
                style={styles.name_input}
                placeholderTextColor="#7A8D9C"
                placeholder="Frist Name"
                value={first_name}
                onChangeText={setFirstName}
              />
              <TextInput
                style={styles.name_input}
                placeholderTextColor="#7A8D9C"
                placeholder="Last Name"
                value={last_name}
                onChangeText={setLastName}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <TextInput
                style={styles.name_input}
                placeholderTextColor="#7A8D9C"
                placeholder="City"
                value={city}
                onChangeText={setCity}
              />
              <TextInput
                style={styles.name_input}
                placeholderTextColor="#7A8D9C"
                placeholder="State"
                value={state}
                onChangeText={setState}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <TextInput
                style={styles.name_input}
                placeholderTextColor="#7A8D9C"
                keyboardType='numeric'
                placeholder="PostCode"
                value={code}
                onChangeText={setCode}
              />
              <TextInput
                style={styles.name_input}
                placeholderTextColor="#7A8D9C"
                placeholder="Country"
                value={country}
                onChangeText={setCountry}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <TextInput
                style={styles.name_input}
                placeholderTextColor="#7A8D9C"
                keyboardType='email'
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.name_input}
                placeholderTextColor="#7A8D9C"
                keyboardType='numeric'
                placeholder="Contact"
                value={contact}
                onChangeText={setContact}
              />

            </View>

            <TextInput
              style={styles.address_input}
              placeholderTextColor="#7A8D9C"
              placeholder="Address"
              multiline={true}
              value={address_1}
              onChangeText={setAddress_1}
            />
            <TextInput
              style={styles.address_input}
              placeholderTextColor="#7A8D9C"
              placeholder="Address"
              multiline={true}
              value={address_2}
              onChangeText={setAddress_2}
            />
          </View>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.Button}>
              <Text style={{ color: 'black' }}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
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
  bold_text1: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    color: '#7A8D9C',
    width: 150
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
  address_input: {
    padding: moderateScale(20),
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.8,
    shadowRadius: moderateScale(2),
    elevation: 5,
    width: 280,
    color: 'black'

  },

  name_input: {
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.8,
    shadowRadius: moderateScale(2),
    elevation: 5,
    color: 'black',
    width: 150,
    margin: 5,
    marginBottom: 15
  },
  email_input: {
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.8,
    shadowRadius: moderateScale(2),
    elevation: 5,
    color: 'black',
    width: 280,
    margin: 5,
    marginBottom: 15

  },
  description: {
    marginLeft: moderateScale(10),
    color: 'black'
  },
  pay_text: {
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(5),
    color: '#7A8D9C'
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: verticalScale(12),
    display: 'flex',
    minHeight: verticalScale(570),
    paddingBottom: verticalScale(20),
    width: verticalScale(310),
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  Modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Button: {
    width: moderateScale(180),
    height: verticalScale(50),
    backgroundColor: '#126881',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderRadius: moderateScale(20),
    textAlign: 'center'
  },
  shipping_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: '95%',
    height: moderateScale(65),
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#7BCFE9',
    justifyContent: 'center'
  },
  button_container_hold: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
    paddingBottom: 10
  }

})

export default PaymentScreen
