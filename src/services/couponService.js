import axiosInstance from "../utils/axiosInstance";

export const applyCoupon = async (code) => {
  const { data } = await axiosInstance.post("/coupons/apply", { code });
  return data.data;
};

export const getPublicCoupons = async () => {
  const { data } = await axiosInstance.get("/coupons/public");
  return data.data || [];
};

