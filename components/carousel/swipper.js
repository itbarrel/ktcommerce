import React from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import Carousel from 'pinar'

const { width } = Dimensions.get('window')

const Swipper = ({ product }) => {
  return (
    <View style={styles.container}>
      <Carousel style={styles.carousel} showsControls={false}>
        {product?.images?.map((item, index) => (
          <View key={index}>
            <Image
              source={{ uri: item.src }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ))}
      </Carousel>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  carousel: {
    width: width - moderateScale(60),
    maxWidth: '100%'
  },
  image: {
    width: '100%',
    height: '60%',
    aspectRatio: 1
  }
})

export default Swipper
