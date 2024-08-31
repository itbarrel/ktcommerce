import apiClient from '../utils/apiClient'
import { setToken, setUser, setId } from '../utils/storage'
import { fetchMyDetail } from './user'

export async function login (data) {
  const response = await apiClient.post('/wp-json/jwt-auth/v1/token', data, { bearer: true })
  const { token } = response
  if (token) {
    await setToken(token)
    const detailResponse = await fetchMyDetail()
    const UserId = detailResponse.id
    const userData = {
      response

    }

    await setUser(JSON.stringify(userData))
    await setId(JSON.stringify(UserId))
  }
}
