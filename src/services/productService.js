// import axiosInstance from '../utils/axiosInstance'
// import { fallbackProducts } from '../data/fallbackCatalog'
// import { attachLocalProductImages } from '../data/productImageCatalog'

// export const getProducts = async () => {
//   try {
//     const { data } = await axiosInstance.get('/products')
//     const products = data.data || []
//     const source = products.length > 0 ? products : fallbackProducts
//     return source.map(attachLocalProductImages)
//   } catch {
//     // return fallbackProducts.map(attachLocalProductImages)
//     return []
//   }
// }

// export const getProductById = async (id) => {
//   try {
//     const { data } = await axiosInstance.get(`/products/${id}`)
//     return attachLocalProductImages(data.data)
//   } catch {
//     return (
//       // attachLocalProductImages(
//       //   fallbackProducts.find((product) => String(product.id) === String(id)),
//       // ) ||
//       null
//     )
//   }
// }

import axiosInstance from '../utils/axiosInstance'
export const getProducts = async () => {
  try {
    const { data } = await axiosInstance.get('/products')
    return data.data || []
  } catch {
    return []
  }
}
export const getProductById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/products/${id}`)
    return data.data || null
  } catch {
    return null
  }
}
