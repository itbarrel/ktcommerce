import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'

const ProductCard = ({ item }) => {
  console.log('??????????', item)

  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('ProductDetailScreen', { id: item.id })
  }

  const image = item.images.length ? item.images[0]?.src : 'https://randomuser.me/api/portraits/lego/1.jpg'

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.content}>
            <View style={styles.imageSection}>
              <Image
                source={{ uri: image }}
                style={styles.image}
              />
            </View>
            <View style={styles.textSection}>
              {/* <Text style={styles.text1} numberOfLines={3}>
                {item.categories.map(category => `${category.name}, `)}
              </Text> */}
              <Text style={styles.text1}>
                {item.name}
              </Text>
              <Text style={styles.text2}>
                DK {item.price}/-
              </Text>

            </View>
          </View>
        </Card>
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
    width: 350,
    height: 'auto',
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    elevation: 2
  },
  content: {
    flexDirection: 'row'
  },
  imageSection: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey'
  },
  image: {
    width: 160,
    height: 170
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
  }
})

export default ProductCard
