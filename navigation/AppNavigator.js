import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SplashScreen from '../screens/SplashScreen'
import SignUpScreen from '../screens/SignupScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import ProductListingScreen from '../screens/Product/ProductListingScreen'
import ProductListing from '../components/Product'
import LoginScreen from '../screens/LoginScreen'
import { Image, View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CartCard from '../components/cart/card'
import GridProductCard from '../components/Product/gridCard'
import CartCardListing from '../components/cart'
import AntDesign from 'react-native-vector-icons/AntDesign'
import PaymentScreen from '../screens/paymentScreen'
import ProductDetailScreen from '../screens/Product/ProductDetailScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const TabNavigator = () => {
  const navigation = useNavigation()
  const navigateCartscreen = () => {
    navigation.navigate('CartListing')
  }
  return (<Tab.Navigator
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
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>)
}

const AppNavigator = () => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [addToCart, setaddToCart] = useState([])

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
              <Image
                source={require('../assets/images/logo_sort.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              {/* <TouchableOpacity
                style={styles.filterButton}
                onPress={toggleModal}
              >
                <Icon name="menu" color='black ' size={35} />
              </TouchableOpacity> */}
            </View>
          ),
          headerLeft: () => null
        }}
      />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="CartListing" component={CartCardListing}
        initialParams={{ addToCart }}
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
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        initialParams={{ setaddToCart }}
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
  logo: {
    width: 100,
    height: 100
  }

})

export default AppNavigator
