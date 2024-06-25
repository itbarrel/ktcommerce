import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const CategoryCard = ({ item, isSelected, onSelect }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isSelected && styles.buttonSelected]}
        onPress={onSelect}
      >
        <Text style={styles.buttonText}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonSelected: {
    backgroundColor: 'blue'
  },
  buttonText: {
    fontSize: 15,
    color: 'white'
  },
  container: {
    marginTop: 15,
    paddingBottom: 30
  }

})

export default CategoryCard
