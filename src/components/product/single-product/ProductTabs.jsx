import { motion, AnimatePresence } from "framer-motion";
import {
  Baby,
  CalendarDays,
  CheckCircle2,
  Clock,
  Droplets,
  HandHeart,
  HeartPulse,
  Lock,
  Package,
  Pill,
  Sun,
} from "lucide-react";
import ProductTrustBadges from "./ProductTrustBadges";
import { PRODUCT_BENEFITS_DATA } from "../../../data/productBenefitsData";
import { resolveProductImageKey } from "../../../data/productImageCatalog";

import howToCholesterol from "../../../assets/images/how to use/Blood cholestrol.jpeg";
import howToBloodSugar from "../../../assets/images/how to use/Blood Sugar.jpeg";
import howToBrainTonic from "../../../assets/images/how to use/Brain tonic.jpeg";
import howToGeneralHealth from "../../../assets/images/how to use/General Health.jpeg";
import howToVitality from "../../../assets/images/how to use/Vitality.jpeg";

const pickHowToUseIcon = (item, idx) => {
  const haystack = `${item?.title || ""} ${item?.desc || ""}`.toLowerCase();

  if (/(morning|breakfast|am\b|after breakfast|sunlight)/.test(haystack)) {
    return Sun;
  }
  if (/(daily|consistent|consisten|routine|week|weeks|schedule)/.test(haystack)) {
    return CalendarDays;
  }
  if (/(hydr|water|litre|liter|drink)/.test(haystack)) {
    return Droplets;
  }
  if (/(store|storage|cool|dry place|away from)/.test(haystack)) {
    return Package;
  }

  // Fall back to consistent step icons (avoids rendering "Step" text from CMS icons)
  if (idx === 0) return Sun;
  if (idx === 1) return CalendarDays;
  if (idx === 2) return Droplets;
  if (idx === 3) return Package;
  return CheckCircle2;
};

const pickWarningIcon = (item, idx) => {
  const haystack = `${item?.key || ""} ${item?.val || ""}`.toLowerCase();

  if (/(pregnan|nursing|breastfeed)/.test(haystack)) return Baby;
  if (/(drug|interact|thinner|thyroid|immuno)/.test(haystack)) return Pill;
  if (/(overdose|exceed|dose|drows)/.test(haystack)) return Clock;
  if (/(allerg|rash|itch|swelling)/.test(haystack)) return HandHeart;
  if (/(child|children|under\\s*18)/.test(haystack)) return Baby;
  if (/(chronic|condition|diabet|hypertens|autoimmune)/.test(haystack))
    return HeartPulse;
  if (/(keep out|out of reach|store out)/.test(haystack)) return Lock;

  if (idx === 0) return Baby;
  if (idx === 1) return Pill;
  if (idx === 2) return Clock;
  if (idx === 3) return HandHeart;
  return Clock;
};

export default function ProductTabs({
  activeTab,
  setActiveTab,
  TABS,
  fadeInUp,
  product,
  productContent,
  activeImageUrl,
  benefits,
  warnings,
  howToUse,
  ingredients,
  ingredientCards,
  getMatchingIngredientPill,
  showSelectedIngredient,
  selectedIngredientCards,
  previewIngredientPill,
  activeIngredientPill,
  setActiveIngredientPill,
  setHoveredIngredientPill,
  setShowIngredientModal,
  showIngredientModal,
}) {
  const rawDescription =
    product.content?.content?.description || product.productDescription || "";
  const descriptionText = String(rawDescription || "").replace(/\s+/g, " ").trim();
  const descriptionHeading = descriptionText.length > 140
    ? `${descriptionText.slice(0, 140).replace(/[,.;:!?\-–—]+\s*$/g, "")}…`
    : descriptionText;


  const key = resolveProductImageKey(product);
  const canonicalName = {
    cholesterol: "Blood Cholesterol Balance",
    bloodSugar: "Blood Sugar",
    brain: "Brain Tonic",
    vitality: "Vitality Power Plus",
    generalHealth: "General Health",
  }[key] || product?.productName;

  // CMS-uploaded benefits image overrides the static hardcoded one
  const displayImage =
    productContent?.benefitsImage ||
    PRODUCT_BENEFITS_DATA[canonicalName]?.image ||
    activeImageUrl;

  const howToUseImageByProductName = {
    "Blood Cholesterol Balance": howToCholesterol,
    "Blood Sugar": howToBloodSugar,
    "Brain Tonic": howToBrainTonic,
    "General Health": howToGeneralHealth,
    "Vitality Power Plus": howToVitality,
  };
  const howToUseImageByKey = {
    cholesterol: howToCholesterol,
    bloodSugar: howToBloodSugar,
    brain: howToBrainTonic,
    vitality: howToVitality,
    generalHealth: howToGeneralHealth,
  };
  // CMS-uploaded how-to-use image overrides static
  const howToUseImage =
    productContent?.howToUseImage ||
    howToUseImageByProductName[canonicalName] ||
    howToUseImageByKey[key] ||
    null;

  return (
    <div className="max-w-[1400px] mx-auto px-3 lg:px-4 pt-0 pb-10 lg:pb-12">
      <motion.div {...fadeInUp}>
        {/* Tab headers */}
        <div className="flex w-full gap-0 border-b border-[var(--color-border)] mb-8 overflow-x-auto scrollbar-none sm:overflow-x-visible">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`min-w-max flex items-center justify-center gap-2 px-5 py-4 text-center text-sm tracking-[0.1em] uppercase whitespace-nowrap transition-all border-b-2 -mb-px font-semibold sm:min-w-0 sm:flex-1 sm:px-3 ${activeTab === id
                ? "border-[var(--color-sage)] text-[var(--color-text)]"
                : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-sage)]"
                }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {/* Description */}
            {activeTab === "description" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-5 lg:sticky lg:top-[clamp(96px,calc(50vh-300px),180px)] lg:self-start">
                    <div className="group mx-auto w-full max-w-[600px] rounded-2xl border border-[var(--color-border)] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-sage)] hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.12)]">
                      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-[var(--color-bg-soft)] flex items-center justify-center">
                        {displayImage ? (
                          <img
                            src={displayImage}
                            alt={product.productName}
                            className="h-full w-full object-contain p-8 lg:p-10 transition-transform duration-500 group-hover:scale-[1.02]"
                            draggable={false}
                          />
                        ) : (
                          <div className="h-full w-full animate-pulse bg-[var(--color-bg-soft)]" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <h3 className="mb-6 w-full text-[22px] font-semibold leading-[1.35] text-[var(--color-text)]">
                      {descriptionHeading || "Key Benefits"}
                    </h3>

                    <div className="space-y-4">
                      {benefits.map((b, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.07 }}
                          className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-sage)] hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.12)]"
                        >
                          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-[var(--color-sage)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <div className="grid grid-cols-[44px_1fr] items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-sage-light)] text-[var(--color-sage)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[var(--color-sage)] group-hover:text-white">
                              <span className="text-lg">{b.icon}</span>
                            </div>
                            <div className="min-w-0">
                              <span className="block text-base tracking-wide text-[var(--color-text)] mb-1 font-semibold transition-colors duration-500 group-hover:text-[var(--color-sage)]">
                                {b.key}
                              </span>
                              <span className="text-base text-[var(--color-text-secondary)] leading-relaxed font-medium">
                                {b.val}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* <div className="pt-2">
                  <ProductTrustBadges />
                </div> */}
              </div>
            )}

            {/* Ingredients */}
            {activeTab === "ingredients" && ingredients && (
              <div
                className="rounded-2xl p-6 lg:p-10 space-y-8 bg-[linear-gradient(180deg,rgba(130,155,28,0.10),rgba(130,155,28,0.05))]"
                onMouseLeave={() => setHoveredIngredientPill(null)}
                onClick={() => {
                  // setActiveIngredientPill(null);
                  setHoveredIngredientPill(null);
                }}
              >
                {/* Pills row */}
                {/* {ingredients.pills?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setActiveIngredientPill(null);
                        setHoveredIngredientPill(null);
                      }}
                      aria-pressed={!previewIngredientPill}
                      className={`px-4 py-1.5 rounded-full border text-sm font-semibold shadow-sm whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2 ${!previewIngredientPill
                        ? "bg-[#111827] border-[#111827] text-white"
                        : "bg-white border-[#d9cfc4] text-[var(--color-text)] hover:border-[#111827]"
                        }`}
                    >
                      All
                    </motion.button>
                    {ingredients.pills.map((pill, i) => (
                      <motion.button
                        key={i}
                        type="button"
                        whileHover={{ scale: 0.96 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() =>
                          setActiveIngredientPill((current) => {
                            setHoveredIngredientPill(null);
                            return current === pill ? null : pill;
                          })
                        }
                        aria-pressed={previewIngredientPill === pill}
                        className={`px-4 py-1.5 rounded-full border text-sm font-semibold shadow-sm whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2 ${previewIngredientPill === pill
                          ? "bg-[#111827] border-[#111827] text-white"
                          : "bg-white border-[#d9cfc4] text-[var(--color-text)] hover:border-[#111827]"
                          }`}
                      >
                        {pill}
                      </motion.button>
                    ))}
                    <button
                      onClick={() => setShowIngredientModal(true)}
                      className="px-4 py-1.5 rounded-full bg-[#111827] text-white text-sm font-semibold shadow-sm hover:bg-[#374151] transition-colors whitespace-nowrap"
                    >
                      View All Ingredients
                    </button>
                  </div>
                )} */}

                {/* Ingredient cards */}
                {showSelectedIngredient ? (
                  selectedIngredientCards.map(
                    ({ name, desc, img, index }) => (
                      <motion.button
                        key={name || index}
                        type="button"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        onClick={() => {
                          setActiveIngredientPill(previewIngredientPill);
                          setHoveredIngredientPill(null);
                        }}
                        aria-pressed={
                          activeIngredientPill === previewIngredientPill
                        }
                        className="relative z-10 grid min-h-[360px] w-full origin-center cursor-pointer grid-cols-1 items-center gap-8 rounded-2xl bg-white p-6 text-left shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2 sm:p-8 lg:grid-cols-[minmax(260px,0.8fr)_1.2fr] lg:p-10"
                      >
                        <div className="mx-auto flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl bg-[rgba(130,155,28,0.08)]">
                          <img
                            src={img}
                            alt={name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9a8d7d]">
                            Selected Ingredient
                          </p>
                          <h3 className="mb-4 text-3xl font-semibold leading-tight text-[var(--color-text)] sm:text-4xl">
                            {name}
                          </h3>
                          <p className="text-lg font-medium leading-8 text-[var(--color-text-secondary)] sm:text-xl">
                            {desc}
                          </p>
                        </div>
                      </motion.button>
                    ),
                  )
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {ingredientCards.map(({ name, desc, img, index }) => {
                      const matchingPill = getMatchingIngredientPill(name);
                      return (
                        <motion.button
                          key={index}
                          type="button"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ y: -8, scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.06 }}
                          // onMouseEnter={() =>
                          //   setHoveredIngredientPill(matchingPill)
                          // }
                          onClick={() =>
                            setActiveIngredientPill(matchingPill)
                          }
                          aria-pressed={
                            previewIngredientPill === matchingPill
                          }
                          className="flex h-full flex-col items-center rounded-2xl bg-white p-5 text-center shadow-sm outline-none transition-colors hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2"
                        >
                          <div className="w-28 h-28 mb-4 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                            <img
                              src={img}
                              alt={name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-[15px] font-semibold text-[var(--color-text)] mb-1 leading-snug">
                            {name}
                          </h3>
                          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {desc}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* View All Ingredients Modal */}
            <AnimatePresence>
              {showIngredientModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  onClick={() => setShowIngredientModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25 }}
                    className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-[#111827] px-8 pt-8 pb-6">
                      <button
                        onClick={() => setShowIngredientModal(false)}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-lg font-semibold"
                      >
                        ×
                      </button>
                      <h3 className="text-white font-semibold text-lg mb-1">
                        Full Ingredient List
                      </h3>
                      <p className="text-white/50 text-xs">
                        {product?.productName}
                      </p>
                    </div>
                    <div className="bg-[#1f2937] px-8 py-6 max-h-[60vh] overflow-y-auto">
                      {ingredients.list?.map((item, i) => (
                        <div key={i} className="mb-5 last:mb-0">
                          <p className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-2">
                            {item.key}
                          </p>
                          <p className="text-white/90 text-base leading-relaxed font-medium">
                            {item.val}
                          </p>
                        </div>
                      ))}
                      {(!ingredients.list || ingredients.list.length === 0) &&
                        ingredients.pills?.length > 0 && (
                          <p className="text-white/90 text-base leading-relaxed font-medium">
                            {ingredients.pills.join(", ")}
                          </p>
                        )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Warnings / Important */}
            {activeTab === "warning" && (
              <div className="w-full">
                <div className="mb-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-6 py-7 md:px-8 md:py-8">
                 
                  <h2
          className="display-heading text-(--color-text-secondary) text-center mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
         Important Information
        </h2>

                    <p className="text-center text-[20px] font-semibold leading-relaxed text-[var(--color-text)]">
                       This product is not intended to diagnose, treat, cure, or prevent any disease.
                    </p>

                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {warnings.map((row, idx) => {
                    const Icon = pickWarningIcon(row, idx);
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.06 }}
                        className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[var(--color-sage)] hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.12)]"
                      >
                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-[var(--color-sage)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="mx-auto mb-6 flex h-[108px] w-[108px] items-center justify-center overflow-hidden rounded-[26px] bg-[var(--color-bg-soft)]">
                        {row.image ? (
                          <img
                            src={row.image}
                            alt={row.key}
                            className="h-full w-full object-cover rounded-[26px]"
                          />
                        ) : (
                          <motion.div
                            className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(130,155,28,0.22),transparent_55%),linear-gradient(135deg,rgba(8,15,12,0.06),rgba(130,155,28,0.12))]"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{
                              duration: 2.4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <motion.div
                              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-sage-light)] text-[var(--color-sage)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[var(--color-sage)] group-hover:text-white"
                              animate={{ y: [0, -2, 0] }}
                              transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: idx * 0.05,
                              }}
                            >
                              <Icon size={26} />
                            </motion.div>
                          </motion.div>
                        )}
                      </div>

                      <h4 className="mb-2 text-[18px] font-semibold text-[var(--color-text)] transition-colors duration-500 group-hover:text-[var(--color-sage)]">
                        {row.key}
                      </h4>
                      <p className="text-[15px] leading-relaxed text-[var(--color-text-secondary)] font-medium">
                        {row.val}
                      </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* How to use */}
            {activeTab === "howToUse" && (
              <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12 lg:gap-12">
	                <div className="lg:col-span-5">
	                  <div className="group mx-auto w-full max-w-[600px] rounded-2xl border border-[var(--color-border)] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-sage)] hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.12)]">
	                    <div className="aspect-square w-full overflow-hidden rounded-2xl bg-[var(--color-bg-soft)] flex items-center justify-center">
	                      {howToUseImage || displayImage ? (
	                        <img
	                          src={howToUseImage || displayImage}
	                          alt={product.productName}
	                          className="h-full w-full object-contain p-8 lg:p-10 transition-transform duration-500 group-hover:scale-[1.02]"
	                          draggable={false}
	                        />
	                      ) : (
                        <div className="h-full w-full animate-pulse bg-[var(--color-bg-soft)]" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <h3 className="mb-3 w-full text-[22px] font-semibold leading-[1.35] text-[var(--color-text)]">
                    How to use this supplement effectively
                  </h3>
                  <p className="mb-6 max-w-[860px] text-[15px] leading-relaxed text-[var(--color-text-secondary)] font-medium">
                    Follow these steps consistently for best results. Each step
                    is designed to improve absorption, routine adherence, and
                    overall product effectiveness.
                  </p>

                  <div className="space-y-4">
                    {howToUse.map((item, idx) => {
                      const Icon = pickHowToUseIcon(item, idx);

                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.07 }}
                          className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-sage)] hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.12)]"
                        >
                          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-[var(--color-sage)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <div className="grid grid-cols-[44px_1fr] items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-sage-light)] text-[var(--color-sage)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[var(--color-sage)] group-hover:text-white">
                              <Icon size={18} aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                                  Step {String(item.step).padStart(2, "0")}
                                </span>
                                <span className="block text-base tracking-wide text-[var(--color-text)] font-semibold transition-colors duration-500 group-hover:text-[var(--color-sage)]">
                                  {item.title}
                                </span>
                              </div>
                              {String(item.desc || "").trim() ? (
                                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed font-medium">
                                  {item.desc}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-12 pt-2">
                  <ProductTrustBadges />
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
