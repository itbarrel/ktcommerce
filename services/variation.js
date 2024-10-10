import apiClient from '../utils/apiClient'

export function fetchVariationDetail (productId, variationId) {
  return apiClient.get(`/wp-json/wc/v3/products/${productId}/variations/${variationId}`)
}
