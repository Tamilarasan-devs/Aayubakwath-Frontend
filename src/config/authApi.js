import axiosInstance from '../utils/axiosInstance'

const extractTokens = (data) => ({
  token:
    data?.data?.token ||
    data?.token ||
    data?.data?.accessToken ||
    data?.accessToken,
  refreshToken: data?.data?.refreshToken || data?.refreshToken,
})

export const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post('/auth/login', credentials)
  return extractTokens(data)
}

export const registerUser = async (userData) => {
  const { data } = await axiosInstance.post('/auth/register', userData)
  return extractTokens(data)
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
