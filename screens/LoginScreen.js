import React, { useState } from 'react'
import { Button, Text, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'

const LoginScreen = () => {
  const [text, setText] = useState('')
  const [number, setNumber] = useState('')

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.Login}>
          <Text style={styles.title}>Login Screen</Text>
        </View>

        <TextInput
          style={styles.input}
          onChangeText={setText}
          placeholder="Enter the userName"
          value={text}
        />

        <TextInput
          style={styles.input}
          onChangeText={setNumber}
          value={number}
          placeholder="Enter Password"
          secureTextEntry
        />

        <Button
          title="Submit"
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  title: {
    fontSize: 40,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
  },
  container: {
    marginTop: 100
  },
  Login: {
    paddingBottom: 20
  }
})

export default LoginScreen
