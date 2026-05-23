import axios from 'axios'
import { tokenStore, AUTH_LOGOUT_EVENT } from './tokenStore'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aayubakwath-backend-production-2e7f.up.railway.app'

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenStore.getToken()
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

const forceLogout = () => {
  tokenStore.clear()
  // AuthProvider listens for this and handles navigate — keeps this module React-free.
  window.dispatchEvent(new CustomEvent(AUTH_LOGOUT_EVENT))
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }
    originalRequest._retry = true

    const refreshToken = tokenStore.getRefreshToken()
    if (!refreshToken) {
      forceLogout()
      return Promise.reject(error)
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/auth/refresh-token`, {
        refreshToken,
      })

      const newAccessToken =
        data?.data?.token ||
        data?.token ||
        data?.data?.accessToken ||
        data?.accessToken
      const newRefreshToken = data?.data?.refreshToken || data?.refreshToken

      tokenStore.setTokens(newAccessToken, newRefreshToken)
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
      return axiosInstance(originalRequest)
    } catch (refreshError) {
      forceLogout()
      return Promise.reject(refreshError)
    }
  },
)

export const API_URL = `${BASE_URL}/`

export default axiosInstance
