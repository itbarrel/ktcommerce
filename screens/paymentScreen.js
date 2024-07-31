import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CrossIcon from 'react-native-vector-icons/Entypo'
import WalletIcon from 'react-native-vector-icons/AntDesign'
import Modal from 'react-native-modal'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const PaymentScreen = (props) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [code, setCode] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [data, setData] = useState(null)
  console.log(data)

  const handleSubmit = () => {
    const updatedData = { firstName, lastName, contact, address, state, code, city, country }
    setData(updatedData)
    setFirstName('')
    setLastName('')
    setContact('')
    setAddress('')
    setAddress('')
    setState('')
    setCode('')
    setCity('')
    setCountry('')
    toggleModal()
  }
  const totalProductPrice = props.route.params.totalCheckedPrice
  const checkItem = props.route.params.checkedItems
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
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
              {data?.firstName || 'Name'} {data?.lastName || 'Name'}
            </Text>
            <Text style={styles.black_text}>
              {data?.address || 'Address'}
            </Text>
            <Text style={styles.bold_text}>
              {data?.contact || 'Contact'}
            </Text>
            <Text style={styles.bold_text}>
              {data?.city || 'City'}
            </Text>
            <Text style={styles.bold_text}>
              {data?.state || 'State'}
            </Text>
            <Text style={styles.bold_text}>
              {data?.code || 'Postal Code'}
            </Text>
            <Text style={styles.bold_text}>
              {data?.country || 'Country'}
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
          <TouchableOpacity>
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
                placeholder="Enter the Name"
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                style={styles.name_input}
                placeholderTextColor="#7A8D9C"
                placeholder="Enter the LastName"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <TextInput
                style={styles.name_input}
                placeholderTextColor="#7A8D9C"
                placeholder="Enter the City"
                value={city}
                onChangeText={setCity}
              />
              <TextInput
                style={styles.name_input}
                placeholderTextColor="#7A8D9C"
                placeholder="Enter the State"
                value={state}
                onChangeText={setState}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <TextInput
                style={styles.name_input}
                placeholderTextColor="#7A8D9C"
                keyboardType='numeric'
                placeholder="Enter the PostCode"
                value={code}
                onChangeText={setCode}
              />
              <TextInput
                style={styles.name_input}
                placeholderTextColor="#7A8D9C"
                placeholder="Enter the Country"
                value={country}
                onChangeText={setCountry}
              />
            </View>
            <TextInput
              style={styles.address_input}
              placeholderTextColor="#7A8D9C"
              placeholder="Enter the Address"
              multiline={true}
              value={address}
              onChangeText={setAddress}
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
    padding: moderateScale(30),
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
    minHeight: verticalScale(420),
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
