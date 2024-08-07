import apiClient from '../utils/apiClient'

export function fetchProducts (data) {
  return apiClient.get('wp-json/wc/v3/products', data)
}
export function RetrieveProduct (id) {
  return apiClient.get(`wp-json/wc/v3/products/${id}`)
}

// export function fetchMenus () {
//   return apiClient.get('wp-json/menus/v1/menus/forside-menu-2021-q4')
// }

export function fetchMenus () {
  return apiClient.get('wp-json/custom/v1/all-categories')
}
