import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/AntDesign'
import { Card } from 'react-native-paper'

const OrderCard = ({ item }) => {
  console.log(item.line_items[0].image.src, 'lllllllllllllllll')
  const aaa = item.line_items[0].image.src

  return (
    <TouchableOpacity >
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.content}>
            <View style={styles.imageSection}>
              <Image
                source={{ uri: aaa }}
                style={styles.image}
              />
            </View>
            <View style={styles.textSection}>
              <View style={styles.icon}>
                <Text style={styles.text1}>
                 Created-at {item.date_created}
                </Text>
              </View>
              <Text style={styles.text1}>
                 Name: {item.billing.first_name}{item.billing.last_name}
              </Text>
              <Text style={styles.text2}>
                DK {item.total}/-
              </Text>
              <Text style={styles.text1}>
               payment: {item.status}
              </Text>
            </View>
            <View>
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
    width: moderateScale(320),
    height: 'auto',
    marginTop: verticalScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: 'white',
    elevation: 2
  },
  content: {
    flexDirection: 'row'
  },
  imageSection: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: moderateScale(99),
    height: verticalScale(85)
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: moderateScale(10),
    paddingBottom: 10
  },
  text1: {
    fontSize: moderateScale(13),
    marginBottom: verticalScale(5),
    width: moderateScale(150),
    paddingRight: 10,
    color: 'black'
  },
  text2: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    paddingLeft: moderateScale(4),
    color: 'black'
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: verticalScale(195),
    padding: moderateScale(10)
  },
  cart: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: verticalScale(185)
  }

})
export default OrderCard
