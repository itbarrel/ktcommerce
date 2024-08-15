/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import WalletIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { CreateOrder, fetchShipping } from '../services/order'

import { Formik } from 'formik'
import * as Yup from 'yup'

const PaymentScreen = (props) => {
  const [shipping, setShipping] = useState([])
  const [selectedTitle, setSelectedTitle] = useState(null)
  const [coupon, setCoupon] = useState([])
  console.log(coupon, 'OOOOOOOOOOO')

  const handleApply = () => {
    const newCoupon = { code: couponInputValue }
    setCoupon([newCoupon])
    setCouponInputValue('')
  }

  const [couponInputValue, setCouponInputValue] = useState('')
  const isEmptyObject = (obj) => Object.keys(obj).length === 0

  const MethodTitle = selectedTitle?.methodTitle
  const MethodId = selectedTitle?.methodId
  const ShippingPrice = selectedTitle?.ShippingPrice ?? 0

  const titles = shipping.map(att => ({ value: att.id, label: att.title, methodId: att.method_id, methodTitle: att.method_title, ShippingPrice: att.settings?.shipping_price?.value })) || []
  const [user, setUser] = useState({})

  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address_1: '',
    address_2: '',
    state: '',
    postcode: '',
    city: '',
    country: ''
  })

  console.log(user, 'LL........Ll')

  const navigation = useNavigation()

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required!'),
    last_name: Yup.string().required('Last name is required!'),
    phone: Yup.string().required('Contact is required!'),
    address_1: Yup.string().required('Address is required!'),
    postcode: Yup.string().required('Postal code is required!'),
    city: Yup.string().required('City is required!')
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchShipping()
        setShipping(response)
      } catch (error) {
        console.error('There was an error fetching the shipping data:', error)
      }
    }

    fetchData()
  }, [])
  const handleSubmit = (values) => {
    const updatedData = {
      first_name: values.first_name,
      last_name: values.last_name,
      phone: values.phone,
      address_1: values.address_1,
      postcode: values.postcode,
      city: values.city

    }
    setUser(updatedData)
    setInitialValues({})
  }
  const handleEditPress = () => {
    setInitialValues(user)
  }
  const totalPrice = (props.route.params.totalProductPrice)
  const finalPrice = +totalPrice + +ShippingPrice

  const checkItem = props.route.params.allItems
  console.log(checkItem, '.........................')

  const handlePlaceOrder = async () => {
    try {
      const lineItems = checkItem.map((item) => ({
        variation_id: item.variation_id,
        product_id: item.product_id,
        quantity: item.quantity
      }))

      console.log(lineItems, 'JJJJJJJJJJ')
      const payload = {
        billing: user,
        shipping: user,
        line_items: lineItems,
        shipping_lines: [
          {
            method_id: MethodId,
            method_title: MethodTitle,
            total: ShippingPrice
          }
        ],
        coupon_lines: coupon,
        payment_method: 'bacs',
        payment_method_title: 'Direct Bank Transfer',
        set_paid: true
      }
      const response = await CreateOrder(payload)
      Alert.alert(
        'Success',
        'Order placed successfully',
        [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]
      )
    } catch (error) {
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
            <TouchableOpacity onPress={handleEditPress}>
              <View>
                <Text style={styles.black_text}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <View style={{ marginLeft: moderateScale(270) }}>
            </View>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.shipping_container}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.name_input}
                        placeholderTextColor="#7A8D9C"
                        placeholder="First Name"
                        onChangeText={handleChange('first_name')}
                        onBlur={handleBlur('first_name')}
                        value={values.first_name}
                      />
                      {touched.first_name && errors.first_name && (
                        <Text style={styles.errorText}>{errors.first_name}</Text>
                      )}
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.name_input}
                        placeholderTextColor="#7A8D9C"
                        placeholder="Last Name"
                        onChangeText={handleChange('last_name')}
                        onBlur={handleBlur('last_name')}
                        value={values.last_name}
                      />
                      {touched.last_name && errors.last_name && (
                        <Text style={styles.errorText}>{errors.last_name}</Text>
                      )}
                    </View>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.name_input}
                        placeholderTextColor="#7A8D9C"
                        placeholder="City"
                        onChangeText={handleChange('city')}
                        onBlur={handleBlur('city')}
                        value={values.city}
                      />
                      {touched.city && errors.city && (
                        <Text style={styles.errorText}>{errors.city}</Text>
                      )}
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.name_input}
                        placeholderTextColor="#7A8D9C"
                        keyboardType='numeric'
                        placeholder="PostCode"
                        onChangeText={handleChange('postcode')}
                        onBlur={handleBlur('postcode')}
                        value={values.postcode}
                      />
                      {touched.postcode && errors.postcode && (
                        <Text style={styles.errorText}>{errors.postcode}</Text>
                      )}
                    </View>

                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.address_input}
                        placeholderTextColor="#7A8D9C"
                        keyboardType='numeric'
                        placeholder="Contact"
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                      />
                      {touched.phone && errors.phone && (
                        <Text style={styles.errorText}>{errors.phone}</Text>
                      )}
                    </View>
                  </View>
                  <TextInput
                    style={styles.address_input}
                    placeholderTextColor="#7A8D9C"
                    placeholder="Address Line 1"
                    multiline={true}
                    onChangeText={handleChange('address_1')}
                    onBlur={handleBlur('address_1')}
                    value={values.address_1}
                  />
                  {touched.address_1 && errors.address_1 && (
                    <Text style={styles.errorText}>{errors.address_1}</Text>
                  )}

                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.Button}>
                      <Text style={{ color: 'black' }}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
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
            <Text style={styles.bold_text}>
              {user?.phone || 'Contact'}
            </Text>
            <Text style={styles.bold_text}>
              {user?.city || 'City'}
            </Text>
            <Text style={styles.bold_text}>
              {user?.postcode || 'Postal Code'}
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

          <View style={styles.dropdownContainer}>
            <View style={styles.text_container}>
              <Text style={styles.inner_text}>Shipping Method</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.textColor}
                data={titles}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={titles.length === 0 ? 'Not available' : 'Methods'}
                value={selectedTitle}
                labelStyle={styles.labelStyle}
                onChange={item => {
                  setSelectedTitle(item)
                }}
              />
            </View>
          </View>
          <View style={styles.text_container}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.coupon_input}
                placeholderTextColor="#7A8D9C"
                placeholder="Apply Coupon"
                value={couponInputValue}
                onChangeText={(text) => setCouponInputValue(text)}
              />

            </View>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={handleApply}>
                <View style={styles.Apply_button}>
                  <Text>Apply</Text>

                </View>
              </TouchableOpacity>
            </View>
          </View>
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
              <Text style={styles.black_text}>DKK{totalPrice}</Text>
            </View>
          </View>
          <View style={styles.inner_container}>
            <View style={styles.location}>
              <Text style={styles.black_text}>
                Subtotals for shipping
              </Text>
            </View>
            <View>
              <Text style={styles.black_text}>
                {ShippingPrice !== 0 ? `DKK${ShippingPrice}` : 'Free'}
              </Text>
            </View>
          </View>
          <View style={styles.inner_container}>
            <View style={styles.location}>
              <Text style={styles.bold_text}>Total Payment</Text>
            </View>
            <View>
              <Text style={styles.black_text}>DKK{finalPrice}</Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handlePlaceOrder} disabled={!selectedTitle || isEmptyObject(user)}>
            <View style={[styles.button_container_hold, (!selectedTitle || !user) && styles.disabledButton]}>
              <View style={styles.buttonContainer}>
                <Text style={styles.text_cart}>Place Order</Text>
              </View>
            </View>
          </TouchableOpacity>
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
    width: 305,
    color: 'black',
    margin: 5

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

  coupon_input: {
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: moderateScale(2),
    elevation: 5,
    color: 'black',
    height: moderateScale(43),
    width: 150
  },

  disabledButton: {
    opacity: 0.5
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
    display: 'flex',
    paddingBottom: verticalScale(20),
    width: verticalScale(310),
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20
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
  },
  errorText: {
    color: 'red',
    fontSize: moderateScale(12),
    marginLeft: 10
  },
  dropdown: {
    margin: moderateScale(8),
    height: verticalScale(35),
    backgroundColor: 'white',
    borderRadius: 12,
    color: 'black',
    padding: 12,
    shadowColor: 'black',
    width: verticalScale(140),
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  textColor: {
    color: 'black'
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black'

  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black'

  },
  text_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  inner_text: {
    fontSize: 15,
    color: '#7A8D9C',
    fontWeight: 'bold'
  },
  Apply_button: {
    height: 40,
    width: 100,
    backgroundColor: '#7BCFE9',
    borderRadius: 8,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  }

})

export default PaymentScreen
