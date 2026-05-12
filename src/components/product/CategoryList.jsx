import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getCategories } from "../../services/categoryService";

const CATEGORY_NAME_OVERRIDES = {
  cardio: "Blood Cholesterol",
  metabolic: "Blood Sugar",
  mind: "Brain Tonic",
  daily: "General Health",
  energy: "Vitality",
};

function getCollectionName(category) {
  const byId = CATEGORY_NAME_OVERRIDES[category?.id];
  if (byId) return byId;

  const value = String(category?.name || "").toLowerCase();
  if (value.includes("cholesterol") || value.includes("heart")) return "Blood Cholesterol";
  if (value.includes("sugar") || value.includes("metabolic")) return "Blood Sugar";
  if (value.includes("brain") || value.includes("mind")) return "Brain Tonic";
  if (value.includes("general") || value.includes("daily")) return "General Health";
  if (value.includes("vitality") || value.includes("energy")) return "Vitality";
  return category?.name || "";
}

export default function CategoryBannerList() {
  const navigate = useNavigate();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
console.log('categories :',categories)
  if (categories.length === 0) return null;

  return (
    <section className="w-full overflow-hidden">
      <div className="flex overflow-x-auto scrollbar-none -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 gap-3">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id || i}
            onClick={() => navigate(`/productListing?category=${cat.id}`)}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="shrink-0
              px-5 py-3 rounded-md hover:rounded-tr-full hover:rounded-bl-full
              bg-black hover:bg-[var(--color-bg-soft)]
              border border-[var(--color-border)] hover:border-[var(--color-sage)]/40
              text-white hover:text-[var(--color-sage)]
              font-body text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase
              transition-all duration-[300ms] ease-in-out
              text-center leading-tight line-clamp-1"
          >
            {getCollectionName(cat)}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
