import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ProductCard = ({ item }) => {
  const navigation = useNavigation()
  const handlePress = () => {
    navigation.navigate('ProductDetailScreen', { id: item.id })
  }
  const image = item.images.length ? item.images[0]?.src : 'https://randomuser.me/api/portraits/lego/1.jpg'
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.imageSection}>
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
          </View>
          <View style={styles.textSection}>
            <Text style={styles.text1}>
              {item.categories.map(category => `${category.name}, `)}
            </Text>
            <Text style={styles.text1}>
              {item.name}
            </Text>
            <Text style={styles.text2}>
            DK {item.price}/-
            </Text>
            <Text style={styles.text2}>
            Total Sales: {item.total_sales}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: 320,
    height: 'auto',
    backgroundColor: 'orange',
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 5
  },
  imageSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey'
  },
  textSection: {
    flex: 2,
    paddingLeft: 10
  },
  image: {
    width: 100,
    height: 100
  },
  text1: {
    fontSize: 16
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 20

  }
})

export default ProductCard
