import axiosInstance from '../utils/axiosInstance'

export const submitContactForm = async (payload) => {
  const res = await axiosInstance.post('/inquiries/contact', payload)
  return res.data
}
