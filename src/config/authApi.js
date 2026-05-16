import axiosInstance from '../utils/axiosInstance'

const extractAuthData = (data) => {
  const result = data?.data || data
  return {
    token: result.token || result.accessToken,
    refreshToken: result.refreshToken,
    user: result.user
  }
}

export const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post('/auth/login', credentials)
  return extractAuthData(data)
}

export const registerUser = async (userData) => {
  const { data } = await axiosInstance.post('/auth/register', userData)
  return data.data
}

export const verifyOtp = async ({ userId, otp }) => {
  const { data } = await axiosInstance.post('/auth/verify-otp', { userId, otp })
  return extractAuthData(data)
}

export const resendOtp = async (userId) => {
  const { data } = await axiosInstance.post('/auth/resend-otp', { userId })
  return data.data
}

export const forgotPassword = async (email) => {
  const { data } = await axiosInstance.post('/auth/forgot-password', { email })
  return data.data
}

export const verifyResetOtp = async ({ userId, otp }) => {
  const { data } = await axiosInstance.post('/auth/verify-reset-otp', { userId, otp })
  return data.data
}

export const resetPassword = async ({ userId, otp, password }) => {
  const { data } = await axiosInstance.post('/auth/reset-password', { userId, otp, password })
  return data.data
}
