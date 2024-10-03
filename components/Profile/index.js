import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { fetchMyInformation } from '../../services/user'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getId } from '../../utils/storage'
import Icon from 'react-native-vector-icons/AntDesign'
import LocationIcon from 'react-native-vector-icons/MaterialIcons'
import DocumentIcon from 'react-native-vector-icons/Entypo'

const ProfileCard = () => {
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const handleLogin = () => {
    navigation.navigate('LoginScreen')
  }
  const handleOrder = () => {
    navigation.navigate('OrderScreen')
  }
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true)
        try {
          const id = await getId()
          console.log(id, '......................')

          if (id) {
            const response = await fetchMyInformation(id)
            setUser(response)
          } else {
            setUser(null)
          }
        } catch (error) {
          console.error('Error fetching data:', error)
          setUser(null)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    }, [])
  )
  const imageUrl = 'https://ace.jeka.by/assets/images/avatars/profile-pic.jpg'
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.imgae_container}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
          />
        </View>
        {
          loading
            ? (
              <View>
                <ActivityIndicator />
              </View>
            )
            : (
              <View>
                <Text style={styles.user_name}>{user?.username || 'Guest User'}</Text>
                <Text style={styles.user_email}>{user?.email || 'user@gmail.com'}</Text>
              </View>
            )
        }
      </View>
      <View style={styles.card_container}>
        <View style={styles.card_baar_hold}>
          <TouchableOpacity>
            <View style={styles.card_baar}>
              <View>
                <Icon
                  name='user'
                  size={18}
                  color="#7A8D9C"
                />
              </View>
              <Text style={styles.text}>Account</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.card_baar}>
              <View>
                <LocationIcon
                  name='location-pin'
                  size={20}
                  color="#7A8D9C"
                />
              </View>
              <Text style={styles.text}>My Address</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOrder}>
            <View style={styles.card_baar}>
              <View>
                <DocumentIcon
                  name='text-document'
                  size={18}
                  color="#7A8D9C"
                />
              </View>
              <Text style={styles.text}>My Order</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin}>
            <View style={styles.card_baar}>
              <View>
                <Icon
                  name='login'
                  size={18}
                  color="#7A8D9C"
                />
              </View>
              <Text style={styles.text}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#faf9f7',
    width: '100%',
    height: 250

  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderColor: 'white',
    borderWidth: 5
  },
  imgae_container: {
    marginTop: 40
  },
  user_name: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    color: 'black'
  },
  user_email: {
    fontSize: 15,
    color: 'black'

  },
  card_container: {
    alignItems: 'center',
    width: '100%',
    height: 400
  },
  card_baar: {
    height: 70,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    border: 'none',
    flexDirection: 'row',
    padding: 15,
    margin: 5,
    borderColor: '#f0efee',
    borderWidth: 1
  },
  text: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '400',
    color: 'black'
  },
  card_baar_hold:
  {
    // marginTop: -40
  }

})

export default ProfileCard
