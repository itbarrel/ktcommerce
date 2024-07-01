import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import Carousel from 'pinar'

const Swipper = ({ product }) => {
  return (
    <View style={styles.container}>
      <Carousel
        showsControls={false}
      >
        {product?.images?.map((item, index) => (
          <View key={index} style>
            <Image source={{ uri: item.src }} style={styles.image} />
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
    alignItems: 'center'
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a3c9a8'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#84b59f'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#69a297'
  },
  text: {
    color: '#1f2d3d',
    opacity: 0.7,
    fontSize: 48,
    fontWeight: 'bold'
  },
  image: {
    height: verticalScale(200),
    width: 'auto'
  }

})

export default Swipper
