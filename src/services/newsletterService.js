import axiosInstance from '../utils/axiosInstance'

export const subscribeNewsletter = async (email, name = '') => {
  const res = await axiosInstance.post('/newsletter/subscribe', { email, name })
  return res.data
}

export const unsubscribeNewsletter = async (email) => {
  const res = await axiosInstance.post('/newsletter/unsubscribe', { email })
  return res.data
}
