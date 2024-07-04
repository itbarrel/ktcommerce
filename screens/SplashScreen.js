import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const SplashScreen = () => {
  const AnimatedImage = Animatable.createAnimatableComponent(Image)
  const zoomInLogoRef = useRef(null)
  const navigation = useNavigation()

  useEffect(() => {
    const zoomInOnMount = setTimeout(() => {
      if (zoomInLogoRef.current) {
        zoomInLogoRef.current.zoomIn(1000)
      }
    })

    return () => clearTimeout(zoomInOnMount)
  }, [])

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate('ProductListingScreen')
      }, 1500)

      return () => clearTimeout(timer)
    }, [navigation])
  )

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <AnimatedImage
          ref={zoomInLogoRef}
          source={require('../assets/images/logo_sort.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

})

export default SplashScreen
