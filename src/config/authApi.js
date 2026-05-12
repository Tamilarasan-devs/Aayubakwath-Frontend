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
