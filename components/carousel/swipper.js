import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Carousel from 'pinar' // Ensure correct import

const Swipper = () => {
  const slideItems = [
    {
      key: '1',
      image: require('../../assets/images/images.jpeg'), // Replace with your image path
      backgroundColor: '#a3c9a8'
    },
    {
      key: '2',
      image: require('../../assets/images/images.jpeg'), // Replace with your image path
      backgroundColor: '#84b59f'
    },
    {
      key: '3',
      image: require('../../assets/images/images.jpeg'), // Replace with your image path
      backgroundColor: '#84b59f'
    }

  ]

  return (
    <View style={styles.container}>
      <Carousel
        showsControls={false}
      >
        {slideItems.map(item => (
          <View key={item.key} style>
            <Image source={item.image} style={styles.image} />
          </View>
        ))}
      </Carousel>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  }

})

export default Swipper
