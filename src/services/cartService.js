import axiosInstance from "../utils/axiosInstance"
import { tokenStore } from "../utils/tokenStore"

export const getCart = async () => {
  if (!tokenStore.getToken()) {
    const items = JSON.parse(localStorage.getItem("guest_cart") || "[]")
    return { data: items }
  }
  const { data } = await axiosInstance.get("/cart")
  return data
}

export const getCartCount = async () => {
  if (!tokenStore.getToken()) {
    const items = JSON.parse(localStorage.getItem("guest_cart") || "[]")
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    return { data: { total: count } }
  }
  const { data } = await axiosInstance.get("/cart/count")
  return data
}

export const addToCart = async ({ productId, quantity = 1, product = null }) => {
  if (!tokenStore.getToken()) {
    const items = JSON.parse(localStorage.getItem("guest_cart") || "[]")
    const existingIndex = items.findIndex(item => item.productId === productId)
    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity
    } else {
      items.push({
        id: productId,
        productId,
        quantity,
        product
      })
    }
    localStorage.setItem("guest_cart", JSON.stringify(items))
    return { data: items }
  }
  const { data } = await axiosInstance.post("/cart", { productId, quantity })
  return data
}

export const updateCartItem = async ({ productId, quantity }) => {
  if (!tokenStore.getToken()) {
    const items = JSON.parse(localStorage.getItem("guest_cart") || "[]")
    const existingIndex = items.findIndex(item => item.productId === productId)
    if (existingIndex > -1) {
      items[existingIndex].quantity = quantity
      localStorage.setItem("guest_cart", JSON.stringify(items))
    }
    return { data: items }
  }
  const { data } = await axiosInstance.put(`/cart/${productId}`, { quantity })
  return data
}

export const removeFromCart = async (productId) => {
  if (!tokenStore.getToken()) {
    let items = JSON.parse(localStorage.getItem("guest_cart") || "[]")
    items = items.filter(item => item.productId !== productId)
    localStorage.setItem("guest_cart", JSON.stringify(items))
    return { data: items }
  }
  const { data } = await axiosInstance.delete(`/cart/${productId}`)
  return data
}

export const clearCart = async () => {
  if (!tokenStore.getToken()) {
    localStorage.removeItem("guest_cart")
    return { data: null }
  }
  const { data } = await axiosInstance.delete("/cart")
  return data
}

