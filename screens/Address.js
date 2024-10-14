import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'

const Address = (props) => {
  const user = props.route.params.user.billing
  console.log(user.address_1, 'qqqqqqqqqqqq')

  return (
    <View>
      <Card style={styles.card}>
        <Text style={styles.adress}>Your Address</Text>
        <Text style={{ color: 'black' }}>
          <Text style={{ fontWeight: 'bold' }}>Address1:</Text> {user?.address_1}
        </Text>
        <Text style={{ color: 'black' }}>
          <Text style={{ fontWeight: 'bold' }}>Address2:</Text> {user?.address_2 ? user.address_2 : '---'}
        </Text>
        <Text style={{ color: 'black' }}>
        </Text>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#faf9f7',
    width: '100%',
    height: 150,
    alignContent: 'center'

  },
  adress: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    display: 'flex',
    textAlign: 'center',
    padding: 10
  }
})

export default Address
