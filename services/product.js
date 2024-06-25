import apiClient from '../utils/apiClient'

export function fetchProducts (data) {
  return apiClient.get('wp-json/wc/v3/products', data)
}
export function fetchMenus () {
  return apiClient.get('wp-json/menus/v1/menus/forside-menu-2021-q4')
}
