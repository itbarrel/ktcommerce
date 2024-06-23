import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
// import { Icon } from '@rneui/themed'

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftIcon}>
        {/* <Icon name="menu" type="material" color="#fff" /> */}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My App</Text>
        <Text style={styles.subtitle}>Welcome</Text>
      </View>
      <View style={styles.rightIcon}>
        {/* <Icon name="search" type="material" color="#fff" /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    padding: 12,
    paddingTop: 15
  },
  leftIcon: {
    flex: 1
  },
  titleContainer: {
    flex: 4,
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#fff',
    fontSize: 14
  },
  rightIcon: {
    flex: 1,
    alignItems: 'flex-end'
  }
})

export default Header
