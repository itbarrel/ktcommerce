import apiClient from '../utils/apiClient'

export function fetchProducts () {
  return apiClient.get('wp-json/wc/v3/products')
}
