import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { moderateScale, verticalScale } from 'react-native-size-matters'
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
    flex: 1,
    padding: 15
  },
  imageSection: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: moderateScale(140),
    height: verticalScale(180),
    borderRadius: moderateScale(20)
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: moderateScale(10)
  },
  text1: {
    fontSize: moderateScale(15),
    marginBottom: verticalScale(5),
    width: moderateScale(100)
  },
  text2: {
    fontWeight: 'bold',
    fontSize: moderateScale(20)
  },
  rating_container: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    width: moderateScale(150)
  },
  price: {
    margin: moderateScale(8)
  }

})

export default GridProductCard
