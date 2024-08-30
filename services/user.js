import apiClient from '../utils/apiClient'

export function fetchMyDetail () {
  return apiClient.get('/wp-json/wp/v2/users/me', {}, { bearer: true })
}
