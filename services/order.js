import apiClient from '../utils/apiClient'

export function DeleteOrder (id) {
  return apiClient.delete(`/wp-json/wc/v3/orders/${id}`)
}
