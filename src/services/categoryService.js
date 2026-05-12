import axiosInstance from '../utils/axiosInstance'
import { fallbackCategories } from '../data/fallbackCatalog'

export const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get('/categories')
    const categories = data.data || []
    return categories.length > 0 ? categories : fallbackCategories
  } catch {
    return fallbackCategories
  }
}
