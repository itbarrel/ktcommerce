// services/apiclient/apiClient.js
import ApiClient from './client'
import { BASE_API_URL } from '../urls'
const apiClient = new ApiClient(BASE_API_URL)

export default apiClient
