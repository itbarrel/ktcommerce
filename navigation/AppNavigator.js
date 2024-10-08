import React, { useState, useEffect, useCallback } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Image, View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { verticalScale } from 'react-native-size-matters'

import Icon from 'react-native-vector-icons/MaterialIcons'
import SplashScreen from '../screens/SplashScreen'
import SignUpScreen from '../screens/SignupScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import ProductListingScreen from '../screens/Product/ProductListingScreen'
import ProductListing from '../components/Product'
import LoginScreen from '../screens/LoginScreen'
import CartCard from '../components/Cart/card'
import GridProductCard from '../components/Product/gridCard'
import VarisationDetailScreen from '../screens/VarisationDetailScreen'
import CartCardListing from '../components/Cart'
import AntDesign from 'react-native-vector-icons/AntDesign'
import PaymentScreen from '../screens/PaymentScreen'
import ProductDetailScreen from '../screens/Product/ProductDetailScreen'
import OrderListingScreen from '../screens/OrderListingScreen'
import ProfileScreen from '../screens/ProfileScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getId } from '../utils/storage'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const TabNavigator = () => {
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()
  const navigateCartscreen = () => {
    navigation.navigate('CartListing')
  }
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear()
      setId(null) // Set id to null before navigating
      navigation.navigate('Home')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }
  useFocusEffect(
    useCallback(() => {
      const fetchId = async () => {
        try {
          const fetchedId = await getId()
          console.log('Fetched ID on focus:', fetchedId)
          setId(fetchedId)
        } catch (error) {
          console.error('Error fetching ID:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchId()
    }, [])
  )

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarVisible: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === 'Home') {
            iconName = 'home'
          } else if (route.name === 'Settings') {
            iconName = 'settings'
          } else if (route.name === 'Profile') {
            iconName = 'person'
          }
          // const iconName = iconMapping[route.name]
          return <Icon name={iconName} size={size} color={color} />
        }
      })}
    >
      <Tab.Screen name="Home" component={ProductListingScreen}
        options={{
          headerTitle: () => (
            <View style={styles.container}>
              <Image
                source={require('../assets/images/logo_sort.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <TouchableOpacity onPress={navigateCartscreen}>
                <AntDesign name="shoppingcart" size={20} color="#000" style={styles.icon} />
              </TouchableOpacity>

            </View>
          ),
          headerLeft: () => null
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
          headerTitle: () => (
            <View style={styles.container}>
              <Image
                source={require('../assets/images/logo_sort.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              {
                id !== null
                  ? (
                    <TouchableOpacity onPress={handleLogout}>
                      <AntDesign name="logout" size={20} color="#000" style={styles.icon} />
                    </TouchableOpacity>
                  )
                  : null
              }
            </View>
          )
        }}

      />
      {/* {id && (
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: () => (
              <View style={styles.container}>
                <Image
                  source={require('../assets/images/logo_sort.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <TouchableOpacity onPress={handleLogout}>
                  <AntDesign name="logout" size={20} color="#000" style={styles.icon} />
                </TouchableOpacity>
              </View>
            )
          }}
        />
      )} */}
    </Tab.Navigator>
  )
}

const AppNavigator = () => {
  const [isModalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()
  const navigateCartscreen = () => {
    navigation.navigate('CartListing')
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const ProductListingComponent = () => {
    return (
      <ProductListingScreen isModalVisible={isModalVisible} setModalVisible={setModalVisible} toggleModal={toggleModal} closeModal={closeModal} />
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ tabBarVisible: true, headerShown: false }} />
      <Stack.Screen
        name="ProductListing"
        component={ProductListingComponent}
        options={{
          headerTitle: () => (
            <View style={styles.container}>
              {/* <Image
                source={require('../assets/images/logo_sort.png')}
                style={styles.logo}
                resizeMode="contain"
              /> */}
              <TouchableOpacity
                style={styles.filterButton}
                onPress={toggleModal}
              >
                <Icon name="menu" color='black ' size={35} />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => null
        }}
      />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="VarisationDetailScreen" component={VarisationDetailScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OrderScreen" component={OrderListingScreen} />
      <Stack.Screen name="CartListing" component={CartCardListing}
        options={{
          headerTitle: () => (
            <View style={styles.container}>
              <Image
                source={require('../assets/images/logo_sort.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          )
        }}
      />
      <Stack.Screen name="PaymentScreen"
        component={PaymentScreen}
        options={{
          headerTitle: () => (
            <View style={styles.container1}>
              <Image
                source={require('../assets/images/logo_sort.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <TouchableOpacity onPress={navigateCartscreen}>
                <AntDesign name="shoppingcart" size={20} color="#000" style={styles.icon} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{
          headerTitle: () => (
            <View style={styles.container1}>
              <Image
                source={require('../assets/images/logo_sort.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <TouchableOpacity onPress={navigateCartscreen}>
                <AntDesign name="shoppingcart" size={20} color="#000" style={styles.icon} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    width: verticalScale(310),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  container1: {
    justifyContent: 'space-between',
    width: verticalScale(260),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  logo: {
    width: 100,
    height: 100
  }

})

export default AppNavigator
