import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import LocationIcon from 'react-native-vector-icons/MaterialIcons'
import DocumentIcon from 'react-native-vector-icons/Entypo'

import React from 'react'

const ProfileCard = () => {
  const imageUrl = 'data:image/jpeg;base64,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'
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.imgae_container}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.user_name}>Kylie</Text>
          <Text style={styles.user_email}>alibaba@gmail.com</Text>
        </View>
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
          <TouchableOpacity>
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
          <TouchableOpacity>
            <View style={styles.card_baar}>
              <View>
                <Icon
                  name='hearto'
                  size={18}
                  color="#7A8D9C"
                />
              </View>
              <Text style={styles.text}>My Favourites</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.card_baar}>
              <View>
                <Icon
                  name='setting'
                  size={18}
                  color="#7A8D9C"
                />
              </View>
              <Text style={styles.text}>Settings</Text>
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
    margin: 2,
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
    marginTop: -40
  }

})

export default ProfileCard
