import axiosInstance from "../utils/axiosInstance"

export const getProfile = async () => {
  const { data } = await axiosInstance.get("/auth/profile")
  return data.data
}

export const addAddress = async (addressData) => {
  const { data } = await axiosInstance.post("/users/addresses", addressData)
  return data.data
}

export const removeAddress = async (addressId) => {
  const { data } = await axiosInstance.delete(`/users/addresses/${addressId}`)
  return data.data
}

export const updateAddress = async (addressId, addressData) => {
  const { data } = await axiosInstance.patch(`/users/addresses/${addressId}`, addressData)
  return data.data
}

export const updateUserProfile = async (profileData) => {
  const { data } = await axiosInstance.patch("/users/profile", profileData)
  return data.data
}
