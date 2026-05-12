import axiosInstance from "../utils/axiosInstance"

export const createOrder = async (orderData) => {
  const { data } = await axiosInstance.post("/orders", orderData)
  return data.data
}

export const getMyOrders = async (page = 1, limit = 10) => {
  const { data } = await axiosInstance.get(`/orders?page=${page}&limit=${limit}`)
  return data
}

export const getOrderById = async (id) => {
  const { data } = await axiosInstance.get(`/orders/${id}`)
  return data.data
}
