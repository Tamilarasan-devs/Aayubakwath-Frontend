import axiosInstance from "../utils/axiosInstance"
import { tokenStore } from "../utils/tokenStore"

export const getWishlist = async () => {
  if (!tokenStore.getToken()) {
    const items = JSON.parse(localStorage.getItem("guest_wishlist") || "[]")
    return { data: items }
  }
  const { data } = await axiosInstance.get("/wishlist")
  return data
}

export const addToWishlist = async ({ productId, product = null }) => {
  if (!tokenStore.getToken()) {
    const items = JSON.parse(localStorage.getItem("guest_wishlist") || "[]")
    const exists = items.some(item => item.productId === productId)
    if (!exists) {
      items.push({
        id: productId,
        productId,
        product
      })
      localStorage.setItem("guest_wishlist", JSON.stringify(items))
    }
    return { data: items }
  }
  const { data } = await axiosInstance.post("/wishlist", { productId })
  return data
}

export const removeFromWishlist = async (productId) => {
  if (!tokenStore.getToken()) {
    let items = JSON.parse(localStorage.getItem("guest_wishlist") || "[]")
    items = items.filter(item => item.productId !== productId)
    localStorage.setItem("guest_wishlist", JSON.stringify(items))
    return { data: items }
  }
  const { data } = await axiosInstance.delete(`/wishlist/${productId}`)
  return data
}

export const checkWishlistStatus = async (productId) => {
  if (!tokenStore.getToken()) {
    const items = JSON.parse(localStorage.getItem("guest_wishlist") || "[]")
    const isInWishlist = items.some(item => item.productId === productId || item.product?.id === productId)
    return { data: { isInWishlist } }
  }
  const { data } = await axiosInstance.get("/wishlist")
  const items = data.data || []
  const isInWishlist = items.some(item => item.productId === productId || item.product?.id === productId)
  return { data: { isInWishlist } }
}

export const clearWishlist = async () => {
  if (!tokenStore.getToken()) {
    localStorage.removeItem("guest_wishlist")
    return { data: null }
  }
  const { data } = await axiosInstance.delete("/wishlist")
  return data
}

