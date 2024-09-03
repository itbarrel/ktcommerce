import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Carousel from 'pinar'

const Swipper = ({ product }) => {
  return (
    <View style={styles.container}>
      <Carousel
        style={styles.carousel}
        showsControls={false}
      >
        {product?.images?.map((item, index) => (
          <Image
            key={index}
            source={{ uri: item.src }}
            style={styles.image}
            resizeMode="center"
          />
        ))}
      </Carousel>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  carousel: {
    maxWidth: '100%'
  },
  image: {
    height: '100%'
  }

})

export default Swipper
