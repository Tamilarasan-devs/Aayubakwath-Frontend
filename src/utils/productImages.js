export function getProductImageUrl(image) {
  if (!image) return "";
  const rawUrl =
    typeof image === "string" ? image : image.secureUrl || image.url || "";
  return rawUrl.replace(/^http:\/\//i, "https://");
}

export function isContainProductImage(image) {
  return Boolean(image && typeof image === "object" && image.fit === "contain");
}

function createImageReference(url, fit = "contain") {
  return url ? { url, fit } : null;
}

export function getProductCardImages(product) {
  const productImages = Array.isArray(product?.productImages)
    ? product.productImages.filter(Boolean)
    : [];
  const containImages = productImages.filter(isContainProductImage);
  const preferredImages = containImages.length > 0 ? containImages : productImages;
  const categoryImageUrl = getProductImageUrl(
    product?.category?.image || product?.categoryImage,
  );

  const primaryImage = preferredImages[0] || null;
  const secondaryImage =
    preferredImages.find(
      (image) => getProductImageUrl(image) !== getProductImageUrl(primaryImage),
    ) || primaryImage;

  if (primaryImage) {
    return {
      primaryImage,
      secondaryImage,
    };
  }

  if (categoryImageUrl) {
    const categoryImage = createImageReference(categoryImageUrl, "contain");
    return {
      primaryImage: categoryImage,
      secondaryImage: categoryImage,
    };
  }

  return {
    primaryImage: null,
    secondaryImage: null,
  };
}
