import { productImageSets } from "./productImageCatalog";

export const fallbackCategories = [
  { id: "cardio", name: "Blood Cholesterol" },
  { id: "metabolic", name: "Blood Sugar" },
  { id: "mind", name: "Brain Tonic" },
  { id: "energy", name: "Vitality" },
  { id: "daily", name: "General Health" },
];

export const fallbackProducts = [
  {
    id: "fallback-blood-cholesterol-balance",
    categoryId: "cardio",
    productName: "Blood Cholesterol Balance",
    forWhom: "Men & Women",
    price: 999,
    finalPrice: 749,
    rating: 4.8,
    reviewCount: 168,
    productTags: ["Best Seller", "Heart Support"],
    offerTags: ["Best Seller", "Combo Saver"],
    shortDescription:
      "Ayurvedic support for healthy cholesterol balance and daily cardiovascular wellness.",
    description:
      "A herbal wellness blend traditionally used to support cholesterol balance, circulation, and overall heart health.",
    productImages: productImageSets.cholesterol,
  },
  {
    id: "fallback-blood-sugar",
    categoryId: "metabolic",
    productName: "Blood Sugar",
    forWhom: "Men & Women",
    price: 1099,
    finalPrice: 829,
    rating: 4.7,
    reviewCount: 143,
    productTags: ["Sugar Support", "Daily Use"],
    offerTags: ["Popular", "Value Pack"],
    shortDescription:
      "A herbal formula crafted to support healthy glucose metabolism and balanced energy.",
    description:
      "An Ayurvedic combination of traditionally used herbs that helps support healthy blood sugar management and everyday metabolic comfort.",
    productImages: productImageSets.bloodSugar,
  },
  {
    id: "fallback-brain-tonic",
    categoryId: "mind",
    productName: "Brain Tonic",
    forWhom: "Students & Professionals",
    price: 899,
    finalPrice: 699,
    rating: 4.9,
    reviewCount: 121,
    productTags: ["Focus", "Brain Support"],
    offerTags: ["Top Rated", "Daily Wellness"],
    shortDescription:
      "A calming nootropic blend for focus, memory support, and balanced mental clarity.",
    description:
      "A thoughtfully blended herbal tonic designed to support concentration, memory, and calm cognitive performance through the day.",
    productImages: productImageSets.brain,
  },
  {
    id: "fallback-vitality-support",
    categoryId: "energy",
    productName: "Vitality Support",
    forWhom: "Active Adults",
    price: 1199,
    finalPrice: 899,
    rating: 4.8,
    reviewCount: 96,
    productTags: ["Energy", "Stamina"],
    offerTags: ["Combo Saver", "Best Value"],
    shortDescription:
      "Built to support stamina, energy, and a stronger day-to-day wellness routine.",
    description:
      "An energizing herbal supplement made for people looking to support daily stamina, resilience, and recovery.",
    productImages: productImageSets.vitality,
  },
  {
    id: "fallback-daily-herbal-care",
    categoryId: "daily",
    productName: "Daily Herbal Care",
    forWhom: "Family Wellness",
    price: 799,
    finalPrice: 599,
    rating: 4.6,
    reviewCount: 87,
    productTags: ["Herbal", "Natural"],
    offerTags: ["Family Pick", "Daily Wellness"],
    shortDescription:
      "A clean herbal supplement for everyday immunity, balance, and wellness support.",
    description:
      "A gentle daily-use wellness formula made with herbal ingredients to support balanced routines and everyday nourishment.",
    productImages: productImageSets.generalHealth,
  },
  {
    id: "fallback-herbal-detox",
    categoryId: "daily",
    productName: "Herbal Detox",
    forWhom: "Men & Women",
    price: 949,
    finalPrice: 719,
    rating: 4.7,
    reviewCount: 74,
    productTags: ["Detox", "Cleanse"],
    offerTags: ["Fresh Start", "Popular"],
    shortDescription:
      "A plant-powered detox blend for a cleaner, lighter, more refreshed routine.",
    description:
      "A traditional herbal detox support formula crafted to help you feel lighter, refreshed, and more balanced every day.",
    productImages: productImageSets.generalHealth,
  },
];
