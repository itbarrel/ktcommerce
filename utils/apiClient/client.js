import axios from 'axios'
import withQuery from 'with-query'

import { setRequest, setResponse } from './interceptors'
import Toast, { showErrors } from '../toast'
// eslint-disable-next-line no-unused-vars
import { getToken, removeToken, getFingerPrintToken, removeFingerPrintToken } from '../storage'
import { CONSUMER_KEY, CONSUMER_SECRET } from '../urls'

const successStatuses = [200, 201]
const publicRoutes = ['managers/login']

export default class ApiClient {
  constructor (apiUrl) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }

    this.config = config
    this.apiUrl = apiUrl
    this.isExternal = apiUrl !== process.env.EXPO_PUBLIC_HOST_URL
    this.wocommerce_keys = {
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET
    }
    this.client = axios.create({
      baseURL: apiUrl,
      timeout: 5000,
      headers: config.headers,
      responseType: 'json',
      maxContentLength: 2000,
      maxBodyLength: 2000
    })
    this.client = setRequest(this.client)
    this.client = setResponse(this.client)
  }

  async getConfigurations (path, formData = false) {
    const token = publicRoutes.includes(path) ? null : await getToken()
    const { headers } = this.config
    const internalHeaders = (formData)
      ? { ...headers, 'Content-Type': 'multipart/form-data', Authorization: token }
      : { ...headers, Authorization: token }

    const configuration = token
      ? { ...this.config, headers: internalHeaders }
      : this.config
    return configuration
  }

  async getWOCommerceKeys (obj) {
    return { ...this.wocommerce_keys, ...obj }
  }

  async get (path, data) {
    const url = withQuery(this.apiUrl + path, await this.getWOCommerceKeys(data))
    try {
      return await this.checkStatus(
        await this.client.get(url, await this.getConfigurations(path))
      )
    } catch (error) {
      return await this.handleError(error, path)
    }
  }

  async post (path, data, callback) {
    try {
      return await this.checkStatus(
        await this.client.post(this.apiUrl + path, data, await this.getConfigurations(path)),
        callback
      )
    } catch (error) {
      return await this.handleError(error, path)
    }
  }

  async put (path, data, callback) {
    try {
      return await this.checkStatus(
        await this.client.put(this.apiUrl + path, data, await this.getConfigurations(path)),
        callback
      )
    } catch (error) {
      return await this.handleError(error, path)
    }
  }

  async putFormData (path, data, callback) {
    try {
      return await this.checkStatus(
        await this.client.put(this.apiUrl + path, data, await this.getConfigurations(path, true)),
        callback
      )
    } catch (error) {
      return await this.handleError(error, path)
    }
  }

  async delete (path, data) {
    const url = withQuery(this.apiUrl + path, data)
    try {
      return await this.checkStatus(
        await this.client.delete(url, await this.getConfigurations(path))
      )
    } catch (error) {
      return await this.handleError(error, path)
    }
  }

  async checkStatus (response, callbackFunc = () => {}) {
    await callbackFunc(response)
    if (successStatuses.includes(response.status)) {
      if (response.data.message) {
        Toast.showWithGravity(
          response.data.message,
          Toast.LONG,
          Toast.BOTTOM
        )
      }

      return this.isExternal ? response.data : response.data.data
    } else {
      const error = new Error(response.status)
      error.response = response
      return Promise.reject(error)
    }
  }

  async handleError (error, path) {
    let data

    if (error.response) {
      data = error.response.data

      if (error.response.status === 401) {
        await removeToken()
      // await removeFingerPrintToken()
      }

      if (error.response.status === 403) {
        // Router.push("/secure/dashboard");
      }

      if (error.response.status === 500) {
        // Router.push("/secure/dashboard");
        data = { message: 'Something went wrong' }
      }
    } else {
      data = error
    }

    showErrors(data)
    return Promise.reject(error)
  }
}
