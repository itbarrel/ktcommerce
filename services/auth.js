import apiClient from '../utils/apiClient'
import { setToken, setUser } from '../utils/storage'
import { fetchMyDetail } from './user'

export async function login (data) {
  const response = await apiClient.post('/wp-json/jwt-auth/v1/token', data, { bearer: true })
  const { token } = response
  if (token) {
    await setToken(token)
    console.log('responseresponseresponse', response)
    console.log('JSON.stringify(response)', JSON.stringify(response))
    await setUser(JSON.stringify(response))
  }
  const respons = await fetchMyDetail()
  console.log(respons, 'ssssssssssssssss')
}
