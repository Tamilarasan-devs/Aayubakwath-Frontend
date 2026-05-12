import { getProductImageUrl } from "../../../utils/productImages";

export function mapCartPreviewItems(cartData) {
  return (cartData?.data || []).map((item) => ({
    id: item.id,
    productId: item.productId || item.product?.id,
    name: item.product?.productName || "Unknown Product",
    quantity: Number(item.quantity) || 1,
    price: Number(item.product?.finalPrice) || Number(item.product?.price) || 0,
    image:
      getProductImageUrl(item.product?.productImages?.[0]) ||
      getProductImageUrl(item.product?.image) ||
      "https://placehold.co/300x300",
  }));
}

