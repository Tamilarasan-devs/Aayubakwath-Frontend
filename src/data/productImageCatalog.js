const imageModules = import.meta.glob(
  "../assets/images/_aayubakwath-products/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

const getImage = (fileName) =>
  imageModules[`../assets/images/_aayubakwath-products/${fileName}`];

const createImage = (fileName, fit = "cover") => ({
  url: getImage(fileName),
  fit,
});

export const productImageSets = {
  cholesterol: [
    createImage("1.jpg", "contain"),
    createImage("a2.jpg"),
    createImage("a3.jpg"),
    createImage("a4.jpg"),
    createImage("7.jpg", "contain"),
    createImage("a5.jpg"),
    createImage("a6.jpg"),
    createImage("a7.jpg"),
  ],
  bloodSugar: [
    createImage("9.jpg", "contain"),
    createImage("b2.jpg"),
    createImage("b3.jpg"),
    createImage("b4.jpg"),
    createImage("b5.jpg"),
    createImage("b6.jpg"),
    createImage("15.jpg"),
  ],
  vitality: [
    createImage("18.jpg", "contain"),
    createImage("c2.jpg"),
    createImage("c3.jpg"),
    createImage("c4.jpg"),
    createImage("c5.jpg"),
    createImage("c6.jpg"),
    createImage("c7.jpg"),
  ],
  brain: [
    createImage("25.jpg", "contain"),
    createImage("d2.jpg"),
    createImage("d3.jpg"),
    createImage("d4.jpg"),
    createImage("d5.jpg"),
    createImage("d6.jpg"),
    createImage("d7.jpg"),
  ],
  generalHealth: [
    createImage("33.jpg", "contain"),
    createImage("e2.jpg"),
    createImage("e3.jpg"),
    createImage("e4.jpg"),
    createImage("e5.jpg"),
    createImage("e6.jpg"),
    createImage("e7.jpg"),
  ],
};

const includesAny = (text, values) => values.some((value) => text.includes(value));

export function resolveProductImageKey(product) {
  const primaryHaystack = [
    product?.productName,
    product?.category?.name,
    product?.categoryName,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const secondaryHaystack = [
    product?.description,
    product?.shortDescription,
    product?.productDescription,
    product?.productTags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    includesAny(primaryHaystack, [
      "blood cholesterol balance",
      "blood cholsterol balance",
      "blood cholesterol",
    ])
  ) {
    return "cholesterol";
  }

  if (
    includesAny(primaryHaystack, ["blood sugar"])
  ) {
    return "bloodSugar";
  }

  if (
    includesAny(primaryHaystack, ["brain tonic", "brain", "memory focus"])
  ) {
    return "brain";
  }

  if (
    includesAny(primaryHaystack, ["vitality power plus", "vitality support", "vitality"])
  ) {
    return "vitality";
  }

  if (
    includesAny(primaryHaystack, [
      "general health",
      "daily herbal care",
      "herbal detox",
      "daily wellness",
    ])
  ) {
    return "generalHealth";
  }

  if (
    includesAny(secondaryHaystack, ["cholesterol", "cholsterol", "lipid", "arjuna", "guggul"])
  ) {
    return "cholesterol";
  }

  if (
    includesAny(secondaryHaystack, ["blood sugar", "sugar", "glucose", "diabet", "gurmar"])
  ) {
    return "bloodSugar";
  }

  if (
    includesAny(secondaryHaystack, ["brain", "memory", "focus", "cognitive", "brahmi"])
  ) {
    return "brain";
  }

  if (
    includesAny(secondaryHaystack, ["vitality", "stamina", "energy", "shilajit", "gokshura"])
  ) {
    return "vitality";
  }

  if (
    includesAny(secondaryHaystack, [
      "general health",
      "daily wellness",
      "daily herbal",
      "herbal detox",
      "immunity",
      "tulsi",
      "giloy",
    ])
  ) {
    return "generalHealth";
  }

  return null;
}

export function getLocalProductImages(product) {
  const key = resolveProductImageKey(product);
  return key ? productImageSets[key] : null;
}

export function attachLocalProductImages(product) {
  // If product already has images from the API, don't overwrite them
  if (product?.productImages && product.productImages.length > 0) {
    return product;
  }

  const images = getLocalProductImages(product);
  if (!images) return product;

  return {
    ...product,
    productImages: images.map((image) => ({ ...image })),
  };
}
