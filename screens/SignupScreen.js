import React, { useState } from 'react'
import { Text, SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const SignUpScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <View style={styles.login}>
            <Image source={require('../assets/images/logo_sort.png')} style={styles.logo} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              placeholder="Your Name"
              value={name}
            />
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              placeholder="Your Email"
              value={email}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={togglePasswordVisibility}
              >
                <Icon name={passwordVisible ? 'visibility' : 'visibility-off'} size={moderateScale(24)} color="black" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              value={ConfirmPassword}
            />

          </View>
          <TouchableOpacity>
            <View style={styles.buttonContainerHold}>
              <View style={styles.buttonContainer}>
                <Text style={styles.text}>SIGN Up</Text>
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
    height: moderateScale(60),
    width: '85%',
    margin: moderateScale(5),
    borderWidth: 1,
    padding: moderateScale(10),
    borderRadius: moderateScale(20)
  },
  title: {
    fontSize: moderateScale(40),
    textAlign: 'center'
  },
  container: {
    marginTop: verticalScale(100),
    padding: moderateScale(5)
  },
  login: {
    display: 'flex',
    paddingBottom: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotContainer: {
    width: '90%',
    alignItems: 'flex-end',
    marginBottom: verticalScale(20)
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    margin: moderateScale(12),
    borderWidth: 1,
    borderRadius: moderateScale(20),
    paddingRight: moderateScale(10) // Ensure space for the icon
  },
  passwordInput: {
    flex: 1,
    height: moderateScale(60),
    padding: moderateScale(10)
  },
  iconContainer: {
    position: 'absolute',
    right: moderateScale(10),
    padding: moderateScale(10)
  },
  buttonContainer: {
    width: '85%',
    height: moderateScale(65),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    backgroundColor: '#126881',
    justifyContent: 'center'
  },
  buttonContainerHold: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
    paddingBottom: verticalScale(100)
  },
  text: {
    fontWeight: 'bold',
    color: 'white'
  },
  forgotText: {
    fontWeight: 'bold',
    alignSelf: 'flex-end'
  }
})

export default SignUpScreen
