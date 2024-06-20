import AsyncStorage from '@react-native-async-storage/async-storage'
// eslint-disable-next-line camelcase
import { STORAGE_AUTH_KEY, STORAGE_USER_KEY } from './urls'

export const getItem = (key) => {
  return AsyncStorage.getItem(key)
}

export const setItem = (key, data) => {
  return AsyncStorage.setItem(key, data)
}

export const removeItem = (key) => {
  return AsyncStorage.removeItem(key)
}

export const getToken = () => {
  return AsyncStorage.getItem(STORAGE_AUTH_KEY)
}

export const setToken = (data) => {
  return AsyncStorage.setItem(STORAGE_AUTH_KEY, data)
}

export const removeToken = (key) => {
  return AsyncStorage.removeItem(STORAGE_AUTH_KEY)
}

export const getUser = () => {
  return AsyncStorage.getItem(STORAGE_USER_KEY)
}

export const setUser = (data) => {
  return AsyncStorage.setItem(STORAGE_USER_KEY, data)
}

export const removeUser = (key) => {
  return AsyncStorage.removeItem(STORAGE_USER_KEY)
}
