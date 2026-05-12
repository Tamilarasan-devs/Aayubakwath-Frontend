import axiosInstance from "../utils/axiosInstance"

export const getWishlist = async () => {
  const { data } = await axiosInstance.get("/wishlist")
  return data
}

export const addToWishlist = async ({ productId }) => {
  const { data } = await axiosInstance.post("/wishlist", { productId })
  return data
}

export const removeFromWishlist = async (productId) => {
  const { data } = await axiosInstance.delete(`/wishlist/${productId}`)
  return data
}

export const checkWishlistStatus = async (productId) => {
  const { data } = await axiosInstance.get("/wishlist")
  const items = data.data || []
  const isInWishlist = items.some(item => item.productId === productId || item.product?.id === productId)
  return { data: { isInWishlist } }
}

export const clearWishlist = async () => {
  const { data } = await axiosInstance.delete("/wishlist")
  return data
}
