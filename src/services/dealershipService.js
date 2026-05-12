import axiosInstance from '../utils/axiosInstance'

export const submitBulkOrderForm = async (payload) => {
  const res = await axiosInstance.post('/inquiries/bulk-order', payload)
  return res.data
}
