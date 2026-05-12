import axiosInstance from '../utils/axiosInstance'

export const getAnnouncements = async () => {
  const { data } = await axiosInstance.get('/announcements')
  return data.data || []
}
