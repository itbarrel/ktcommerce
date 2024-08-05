import apiClient from '../utils/apiClient'

export function RetrieveVariation (id, size, color) {
  return apiClient.get(`/wp-json/wc/v3/products/${id}/variations?search="${size}, ${color}"`)
}

export function CreateOrder (data) {
  return apiClient.post('/wp-json/wc/v3/orders', data)
}
