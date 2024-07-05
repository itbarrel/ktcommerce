import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Rating } from 'react-native-ratings'
import { Card } from 'react-native-paper'

const GridProductCard = ({ item }) => {
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('ProductDetailScreen', { id: item.id })
  }

  const image = item.images.length ? item.images[0]?.src : 'https://randomuser.me/api/portraits/lego/1.jpg'

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      <View style={styles.container}>
        <View style={styles.imageSection}>
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        </View>
        <View style={styles.rating_container}>
          <View>
            <Rating
              ratingColor='#F0C30E'
              ratingCount={5}
              imageSize={15}
              style={{ paddingVertical: 10 }}
            />
          </View>
          <View style={styles.price}>
            <Text style={{ color: 'black', fontWeight: '500' }}>DKK {item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1

  },

  imageSection: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 140,
    height: 200,
    borderRadius: 20
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
  text1: {
    fontSize: 15,
    marginBottom: 5,
    width: 100
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 20
  },
  rating_container: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    width: 150
  },
  price: {
    margin: 8
  }

})

export default GridProductCard
