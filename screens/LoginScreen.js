import React, { useState } from 'react'
import { Text, SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const LoginScreen = () => {
  const [text, setText] = useState('')
  const [number, setNumber] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <View style={styles.Login}>
            <Text style={styles.title}>Login Screen</Text>
          </View>

          <View style={styles.input_container}>

            <TextInput
              style={styles.input}
              onChangeText={setText}
              placeholder="UserName"
              value={text}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                onChangeText={setNumber}
                value={number}
                placeholder="Password"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={togglePasswordVisibility}
              >
                <Icon name={passwordVisible ? 'visibility' : 'visibility-off'} size={24} color="black" />
              </TouchableOpacity>
            </View>

          </View>

          <TouchableOpacity style={styles.forgot_container}>
            <Text style={styles.forgot_text}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.button_container_hold}>
              <View style={styles.buttonContainer}>
                <Text style={styles.text}>SIGN IN</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: '85%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20
  },
  title: {
    fontSize: 40,
    textAlign: 'center'
  },
  container: {
    marginTop: 100,
    padding: 5
  },
  Login: {
    paddingBottom: 20
  },
  forgot_container: {
    width: '90%',
    alignItems: 'flex-end',
    marginBottom: 20
  },
  input_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    margin: 12,
    borderWidth: 1,
    borderRadius: 20,
    paddingRight: 10 // Ensure space for the icon
  },
  passwordInput: {
    flex: 1,
    height: 60,
    padding: 10
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    padding: 10
  },
  buttonContainer: {
    width: '85%',
    height: 65,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#126881',
    justifyContent: 'center'
  },
  button_container_hold: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 100
  },
  text: {
    fontWeight: 'bold',
    color: 'white'
  },
  forgot_text: {
    fontWeight: 'bold',
    alignSelf: 'flex-end'
  }
})

export default LoginScreen
