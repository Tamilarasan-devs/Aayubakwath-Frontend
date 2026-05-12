import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../services/cartService";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../../services/wishlistService";
import { getProductById } from "../../services/productService";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import RelatedProduct from "../product/ReleatedProduct";
import FAQ from "./FAQ";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  ChevronDown,
  Heart,
  Share2,
  ShoppingCart,
  Shield,
  Leaf,
  Zap,
  Clock,
  Star,
  Info,
  AlertTriangle,
  BookOpen,
  Minus,
  Plus,
  FlaskConical,
  BadgeCheck,
  Timer,
  Sprout,
  ScrollText,
} from "lucide-react";
import ingredientS1 from "../../assets/images/ingredient/s1.png";
import ingredientS2 from "../../assets/images/ingredient/s2.png";
import ingredientS3 from "../../assets/images/ingredient/s3.png";
import ingredientS4 from "../../assets/images/ingredient/s4.png";
import ingredientS5 from "../../assets/images/ingredient/s5.png";
import ingredientS6 from "../../assets/images/ingredient/s6.png";
import pincodeData from "../../data/pincodeData.json";
import { PRODUCT_BENEFITS_DATA } from "../../data/productBenefitsData";
import { PRODUCT_INGREDIENTS_DATA } from "../../data/productIngerideintsData";
import { resolveProductImageKey } from "../../data/productImageCatalog";

import ProductBreadcrumb from "./single-product/ProductBreadcrumb";
import ProductImageGallery from "./single-product/ProductImageGallery";
import ProductMeta from "./single-product/ProductMeta";
import ProductPricing from "./single-product/ProductPricing";
import ProductPackSelector from "./single-product/ProductPackSelector";
import ProductActions from "./single-product/ProductActions";
import ProductOffers from "./single-product/ProductOffers";
import ProductPincodeCheck from "./single-product/ProductPincodeCheck";
import ProductTabs from "./single-product/ProductTabs";
import ProductStickyBar from "./single-product/ProductStickyBar";

const INGREDIENT_ASSET_URLS = import.meta.glob(
  "../../assets/images/ingredient/**/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" },
);

const DEFAULT_INGREDIENT_CARD_IMAGES = [
  ingredientS1,
  ingredientS2,
  ingredientS3,
  ingredientS4,
  ingredientS5,
  ingredientS6,
];

const getIngredientFolderName = (product) => {
  const byKey = {
    cholesterol: "Blood Cholestrol",
    bloodSugar: "Blood sugar",
    brain: "Brain Tonic",
    generalHealth: "General Health",
    vitality: "Vitality",
  };

  const byName = {
    "Blood Cholesterol Balance": "Blood Cholestrol",
    "Blood Sugar": "Blood sugar",
    "Brain Tonic": "Brain Tonic",
    "General Health": "General Health",
    "Vitality Power Plus": "Vitality",
    Vitality: "Vitality",
  };

  const key = resolveProductImageKey(product);
  return byName[product?.productName] || byKey[key] || null;
};

const sortByImageSerial = (a, b) => {
  const aName = String(a).split("/").pop() || "";
  const bName = String(b).split("/").pop() || "";
  const aNum = Number((aName.match(/(\d+)/) || [])[1]) || 0;
  const bNum = Number((bName.match(/(\d+)/) || [])[1]) || 0;
  if (aNum !== bNum) return aNum - bNum;
  return aName.localeCompare(bName, undefined, { numeric: true });
};

const getIngredientCardImagesForProduct = (product) => {
  const folderName = getIngredientFolderName(product);
  if (!folderName) return DEFAULT_INGREDIENT_CARD_IMAGES;

  const token = `/ingredient/${folderName}/`;
  const urls = Object.entries(INGREDIENT_ASSET_URLS)
    .filter(([path]) => String(path).includes(token))
    .map(([, url]) => url)
    .sort(sortByImageSerial);

  return urls.length > 0 ? urls : DEFAULT_INGREDIENT_CARD_IMAGES;
};

const OFFERS = [
  { icon: "Buy 3 Get 1", body: "Free on all 60 - caps packs" },
  { icon: "Free Delivery", body: "On orders above ₹999" },
  { icon: "Easy Returns", body: "Returns with in 30 days" },
  {
    icon: "Fast Delivery",
    body: "4-7 business days",

  },
];

const BENEFITS_LIST = [
  {
    key: "Energy & Stamina",
    val: "Ashwagandha and Shilajit work together to reduce fatigue and increase physical endurance — noticeable within 2–3 weeks of daily use.",
    icon: "⚡",
  },
  {
    key: "Immune Support",
    val: "Turmeric, Ginger, and Long Pepper provide potent anti-inflammatory and immunomodulatory support.",
    icon: "🛡️",
  },
  {
    key: "Stress & Sleep",
    val: "Brahmi and Ashwagandha are clinically studied adaptogens that lower cortisol and improve sleep quality.",
    icon: "🌙",
  },
  {
    key: "Digestion & Gut",
    val: "Cardamom, Mulethi, and Ginger aid in soothing the digestive tract and reducing bloating.",
    icon: "🌿",
  },
  {
    key: "Antioxidant Protection",
    val: "Saffron and Clove are among the highest ORAC-rated herbs, fighting free radicals and promoting cellular longevity.",
    icon: "✨",
  },
];

const WARNING_LIST = [
  {
    key: "Pregnancy / Nursing",
    val: "Consult your gynaecologist before use if pregnant or breastfeeding.",
  },
  {
    key: "Drug interactions",
    val: "May interact with blood thinners, thyroid medication, or immunosuppressants.",
  },
  {
    key: "Overdose",
    val: "Do not exceed the recommended dose. Excess Ashwagandha may cause drowsiness.",
  },
  {
    key: "Allergies",
    val: "Discontinue immediately if you experience rash, itching, or swelling.",
  },
  {
    key: "Children",
    val: "Not recommended for children under 18 years without medical supervision.",
  },
  {
    key: "Chronic conditions",
    val: "Consult a healthcare provider if you have diabetes, hypertension, or autoimmune disorders.",
  },
  { key: "Keep out of reach", val: "Store out of reach of children and pets." },
];


const parseMaybeJson = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  if (!trimmed.startsWith("[") && !trimmed.startsWith("{")) return value;
  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
};

const normalizeBenefitIcon = (title, provided) => {
  const raw = String(provided || "").trim();
  if (raw) return raw;
  const t = String(title || "").toLowerCase();
  if (t.includes("energy") || t.includes("stamina") || t.includes("vital"))
    return "⚡";
  if (t.includes("immune") || t.includes("immun")) return "🛡️";
  if (t.includes("stress") || t.includes("sleep")) return "🌙";
  if (t.includes("digest") || t.includes("gut")) return "🌿";
  if (t.includes("antioxid")) return "✨";
  return "✨";
};

const normalizeBenefits = (value) => {
  const parsed = parseMaybeJson(value);
  if (!Array.isArray(parsed)) return [];

  const badTokens = new Set([
    "key",
    "val",
    "value",
    "title",
    "heading",
    "desc",
    "description",
    "benefit",
    "benefits",
    "ddec",
    "ddesc",
    "ddecc",
    "ddee",
  ]);

  const cleaned = parsed
    .map((item) => {
      if (!item) return null;

      if (typeof item === "string") {
        const s = item.trim();
        if (!s) return null;
        const [maybeTitle, ...rest] = s.split(":");
        const hasColon = rest.length > 0;
        const title = (maybeTitle || "").trim();
        const desc = hasColon ? rest.join(":").trim() : "";
        if (!title && !desc) return null;
        return {
          key: hasColon ? title : s,
          val: desc,
          icon: normalizeBenefitIcon(title),
        };
      }

      if (typeof item !== "object") return null;

      const titleCandidate =
        item.key ?? item.title ?? item.heading ?? item.name ?? item.benefit;
      const descCandidate =
        item.val ??
        item.value ??
        item.desc ??
        item.description ??
        item.benefits ??
        item.detail ??
        item.body;

      const title = String(titleCandidate || "").trim();
      const desc = String(descCandidate || "").trim();
      const lowerTitle = title.toLowerCase();
      const lowerDesc = desc.toLowerCase();

      // Drop rows that look like accidental column headers / placeholders.
      const looksLikeHeader =
        (lowerTitle === "key" ||
          lowerTitle === "val" ||
          lowerTitle === "value" ||
          lowerTitle === "benefits" ||
          lowerTitle === "title" ||
          lowerTitle === "heading" ||
          lowerTitle === "desc" ||
          lowerTitle === "description") &&
        (lowerDesc === "val" ||
          lowerDesc === "value" ||
          lowerDesc === "benefits" ||
          lowerDesc === "title" ||
          lowerDesc === "heading" ||
          lowerDesc === "desc" ||
          lowerDesc === "description" ||
          lowerDesc.length <= 4);

      const looksTooGeneric =
        badTokens.has(lowerTitle) ||
        badTokens.has(lowerDesc) ||
        lowerDesc.length <= 8 ||
        (lowerTitle.length <= 3 && lowerDesc.length <= 14);

      if (!title || !desc || looksLikeHeader || looksTooGeneric) return null;

      return {
        key: title,
        val: desc,
        icon: normalizeBenefitIcon(title, item.icon ?? item.emoji ?? item.symbol),
      };
    })
    .filter(Boolean);

  // If the payload is too small or looks suspicious, fall back to defaults.
  if (cleaned.length < 3) return [];

  return cleaned;
};

const normalizeWarnings = (value) => {
  const parsed = parseMaybeJson(value);
  if (!Array.isArray(parsed)) return [];

  return parsed
    .map((item) => {
      if (!item) return null;
      if (typeof item === "string") {
        const s = item.trim();
        if (!s) return null;
        const [maybeTitle, ...rest] = s.split(":");
        const title = (maybeTitle || "").trim();
        const desc = rest.join(":").trim() || s;
        if (!title || !desc) return null;
        return { key: title, val: desc };
      }
      if (typeof item !== "object") return null;

      const titleCandidate = item.key ?? item.title ?? item.heading ?? item.name;
      const descCandidate =
        item.val ?? item.value ?? item.desc ?? item.description ?? item.body;
      const title = String(titleCandidate || "").trim();
      const desc = String(descCandidate || "").trim();
      if (!title || !desc) return null;

      const lowerTitle = title.toLowerCase();
      const lowerDesc = desc.toLowerCase();
      const looksLikeHeader =
        (lowerTitle === "key" ||
          lowerTitle === "val" ||
          lowerTitle === "value" ||
          lowerTitle === "desc" ||
          lowerTitle === "description") &&
        (lowerDesc === "val" ||
          lowerDesc === "value" ||
          lowerDesc === "desc" ||
          lowerDesc === "description" ||
          lowerDesc.length <= 4);

      if (looksLikeHeader) return null;
      return { key: title, val: desc };
    })
    .filter(Boolean);
};

const normalizeHowToUse = (value) => {
  const parsed = parseMaybeJson(value);
  if (!Array.isArray(parsed)) return [];

  return parsed
    .map((item, idx) => {
      if (!item) return null;
      if (typeof item === "string") {
        const s = item.trim();
        if (!s) return null;
        return { step: String(idx + 1), title: s, desc: "", icon: "✅" };
      }
      if (typeof item !== "object") return null;

      const stepCandidate =
        item.step ?? item.stepNo ?? item.stepNumber ?? item.number ?? idx + 1;
      const titleCandidate = item.title ?? item.key ?? item.heading ?? item.name;
      const descCandidate =
        item.desc ?? item.val ?? item.value ?? item.description ?? item.body;
      const iconCandidate = item.icon ?? item.emoji ?? item.symbol ?? "✅";

      const step = String(stepCandidate || idx + 1).trim();
      const title = String(titleCandidate || "").trim();
      const desc = String(descCandidate || "").trim();
      const icon = String(iconCandidate || "").trim() || "✅";

      if (!title) return null;

      const lowerTitle = title.toLowerCase();
      const lowerDesc = desc.toLowerCase();
      const looksLikeHeader =
        (lowerTitle === "title" ||
          lowerTitle === "key" ||
          lowerTitle === "desc" ||
          lowerTitle === "description") &&
        (lowerDesc === "desc" ||
          lowerDesc === "description" ||
          lowerDesc.length <= 3);

      if (looksLikeHeader) return null;

      return { step, title, desc, icon };
    })
    .filter(Boolean);
};

const normalizeStringList = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item).trim()).filter(Boolean);
        }
      } catch {
        // Fall back to comma-separated parsing below.
      }
    }
    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const buildPacks = (product) => {
  let tiers = product?.priceTiers;

  if (typeof tiers === "string" && tiers.trim().startsWith("[")) {
    try {
      tiers = JSON.parse(tiers);
    } catch (e) {
      console.error("Failed to parse priceTiers:", e);
      tiers = [];
    }
  }

  if (Array.isArray(tiers) && tiers.length > 0) {
    return tiers.map((tier) => ({
      qty: parseInt(tier.quantity),
      price: Math.round(parseFloat(tier.finalPrice || tier.price)),
      orig: Math.round(parseFloat(tier.price)),
      perUnit:
        parseFloat(tier.finalPrice || tier.price) / parseInt(tier.quantity),
      tag: tier.label,
      duration: tier.label || `${tier.quantity} Capsules`,
      desc: tier.label
        ? `${tier.quantity} Capsules pack`
        : "Quality supplement",
    }));
  }

  const fp = parseFloat(product?.finalPrice || 0);
  const op = parseFloat(product?.price || 0);
  return [

    {
      qty: 60,
      price: Math.round(fp * 1.35),
      orig: Math.round(op * 1.35),
      perUnit: (fp * 1.35) / 60,
      tag: "Best Value",
      duration: "2 Months",
      desc: "Most savings",
    },

  ];
};

const TABS = [
  { id: "description", label: "Benefits", Icon: Info },
  { id: "howToUse", label: "How To Use", Icon: BookOpen },
  { id: "ingredients", label: "Ingredients", Icon: Leaf },
  { id: "warning", label: "Importants", Icon: Info },

];

const StarRow = ({ rating, size = 14 }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={size}
        className={
          i <= Math.round(rating)
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-200"
        }
      />
    ))}
  </div>
);

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function SingleProduct() {
  const { id: productId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [activeImg, setActiveImg] = useState(0);
  const [packIdx, setPackIdx] = useState(1);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState(null);
  const [isExpanded] = useState(false);
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [activeIngredientPill, setActiveIngredientPill] = useState(null);
  const [hoveredIngredientPill, setHoveredIngredientPill] = useState(null);
  const [imageZoom, setImageZoom] = useState({
    active: false,
    x: 50,
    y: 50,
    panelLeft: 0,
    panelTop: 0,
    panelSize: 520,
  });

  const { data: productData, isLoading: loading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
  const product = productData ?? null;

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: isAuthenticated,
  });

  const wishlisted = useMemo(() => {
    const items = wishlistData?.data || [];
    return items.some((w) => (w.productId || w.product?.id) === productId);
  }, [wishlistData, productId]);

  const wishlistMut = useMutation({
    mutationFn: () =>
      wishlisted ? removeFromWishlist(productId) : addToWishlist({ productId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(
        wishlisted ? "Removed from wishlist" : "Added to wishlist!",
      );
    },
    onError: (err) => {
      if (err.response?.status === 401) {
        toast.error("Please login first.");
        navigate("/login");
      } else toast.error("Failed to update wishlist.");
    },
  });

  const productContent = product?.content?.content;

  const benefitsFromContent = normalizeBenefits(productContent?.benefits);
  const canonicalProductName = useMemo(() => {
    const key = resolveProductImageKey(product);
    if (key === "cholesterol") return "Blood Cholesterol Balance";
    if (key === "bloodSugar") return "Blood Sugar";
    if (key === "brain") return "Brain Tonic";
    if (key === "vitality") return "Vitality Power Plus";
    if (key === "generalHealth") return "General Health";
    return product?.productName || null;
  }, [product]);

  const staticData = PRODUCT_BENEFITS_DATA[canonicalProductName];
  const staticBenefits = staticData?.points || [];
  const normalizedStaticBenefits = normalizeBenefits(staticBenefits);

  const benefits =
    benefitsFromContent.length > 0
      ? benefitsFromContent
      : normalizedStaticBenefits.length > 0
        ? normalizedStaticBenefits
        : BENEFITS_LIST;

  const warningsFromContent = normalizeWarnings(productContent?.warnings);
  const warnings =
    warningsFromContent.length > 0 ? warningsFromContent : WARNING_LIST;

  const howToUseFromContent = normalizeHowToUse(productContent?.howToUse);
  const howToUse =
    howToUseFromContent.length > 0
      ? howToUseFromContent
      : [
        {
          step: "01",
          title: "Morning Routine",
          desc: "Take 2 capsules with warm water or milk every morning after breakfast.",
          icon: "☀️",
        },
        {
          step: "02",
          title: "Stay Consistent",
          desc: "Use daily for a minimum of 8 weeks for optimal benefits.",
          icon: "📅",
        },
        {
          step: "03",
          title: "Stay Hydrated",
          desc: "Drink at least 2–3 litres of water daily while taking this supplement.",
          icon: "💧",
        },
        {
          step: "04",
          title: "Proper Storage",
          desc: "Store in a cool, dry place away from direct sunlight.",
          icon: "🏠",
        },
      ];

  const staticIngredients = PRODUCT_INGREDIENTS_DATA[canonicalProductName] || [];
  const ingredients =
    productContent?.ingredients?.list?.length > 0
      ? productContent.ingredients
      : {
        list: [],
        pills: staticIngredients.map((i) => i.name),
        details: staticIngredients.map((i) => `${i.name}: ${i.desc}`),
        raw: staticIngredients,
      };
  const addMut = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Added to cart!");
    },
    onError: (err) => {
      if (err.response?.status === 401) {
        toast.error("Please login first.");
        navigate("/login");
      } else toast.error("Failed to add to cart.");
    },
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }
    addMut.mutate({ productId, quantity: qty });
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }
    addMut.mutate(
      { productId, quantity: qty },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ["cart"] });
          navigate("/checkout");
        },
      },
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setActiveImg(0), 0);
    return () => clearTimeout(t);
  }, [productId]);

  const IMAGES = product?.productImages || [];
  const activeImageUrl = IMAGES[activeImg]?.url;
  const PACKS = product ? buildPacks(product) : [];
  const pack = PACKS[packIdx] ?? {};
  const discPct = pack.orig
    ? Math.round(((pack.orig - pack.price) / pack.orig) * 100)
    : 0;

  const productTags = normalizeStringList(product?.productTags);
  const offerTags = normalizeStringList(product?.offerTags);
  const normalizeIngredientName = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  const INGREDIENT_CARD_IMAGES = getIngredientCardImagesForProduct(product);
  const ingredientCards =
    ingredients.raw?.length > 0
      ? ingredients.raw.map((item, index) => ({
        name: item.name,
        desc: item.desc,
        img:
          INGREDIENT_CARD_IMAGES[index] ||
          item.image ||
          INGREDIENT_CARD_IMAGES[index % INGREDIENT_CARD_IMAGES.length],
        index,
      }))
      : (ingredients.details || []).map((item, index) => {
        const name = item.name || item.split?.(": ")?.[0];
        const desc = item.desc || item.split?.(": ")?.[1];
        const img =
          INGREDIENT_CARD_IMAGES[index] ||
          item.image ||
          INGREDIENT_CARD_IMAGES[index % INGREDIENT_CARD_IMAGES.length];

        return { name, desc, img, index };
      });
  const getMatchingIngredientPill = (name) => {
    const cardName = normalizeIngredientName(name);

    return (
      ingredients.pills?.find((pill) => {
        const pillName = normalizeIngredientName(pill);

        return (
          cardName === pillName ||
          cardName.includes(pillName) ||
          pillName.includes(cardName)
        );
      }) || name
    );
  };
  const previewIngredientPill = activeIngredientPill || hoveredIngredientPill;
  const selectedIngredientCards = previewIngredientPill
    ? ingredientCards.filter((item) => {
      const pillName = normalizeIngredientName(previewIngredientPill);
      const itemName = normalizeIngredientName(item.name);

      return (
        itemName === pillName ||
        itemName.includes(pillName) ||
        pillName.includes(itemName)
      );
    })
    : ingredientCards;
  const showSelectedIngredient =
    previewIngredientPill && selectedIngredientCards.length > 0;
  const handleImageZoomMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const availableWidth = window.innerWidth - rect.right - 36;
    const panelSize = Math.min(680, Math.max(420, availableWidth));

    setImageZoom({
      active: true,
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
      panelLeft: rect.right + 18,
      panelTop: Math.max(
        88,
        Math.min(rect.top, window.innerHeight - panelSize - 16),
      ),
      panelSize,
    });
  };

  const hideImageZoom = () => {
    setImageZoom((current) => ({ ...current, active: false }));
  };

  const checkPincode = () => {
    if (pincode.length !== 6) {
      setPincodeMsg({ type: "error", msg: "Enter a valid 6-digit pincode." });
      return;
    }
    const state = pincodeData[pincode];
    if (!state) {
      setPincodeMsg({
        type: "error",
        msg: "Sorry, delivery is not available to this pincode.",
      });
      return;
    }
    const FAST_STATES = ["TAMIL NADU"];
    const MEDIUM_STATES = [
      "KERALA",
      "KARNATAKA",
      "ANDHRA PRADESH",
      "TELANGANA",
    ];
    const days = FAST_STATES.includes(state)
      ? 4
      : MEDIUM_STATES.includes(state)
        ? 5
        : 7;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    const formattedDate = deliveryDate.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const stateName = state
      .split(" ")
      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
      .join(" ");
    setPincodeMsg({
      type: "success",
      msg: `Delivery to ${stateName} by ${formattedDate}`,
      days,
      stateName,
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-2 border-gray-400/30 border-t-gray-400"
        />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[var(--color-text)]">
        <p className="text-2xl text-[var(--color-text-muted)] tracking-tight">
          Product not found
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-[var(--color-text-muted)] hover:underline"
        >
          Go back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-[var(--color-text)] selection:bg-[var(--color-sage-light)]">
      {/* ═══════════════════════════════════════════════════════════
          TOP BAR — Geometric minimal
         ═══════════════════════════════════════════════════════════ */}
      <ProductBreadcrumb productName={product.productName} navigate={navigate} />

      {/* ═══════════════════════════════════════════════════════════
          HERO — Geometric grid layout
         ═══════════════════════════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 pt-8 lg:pt-12 pb-2 lg:pb-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT — Image gallery (span 5) */}
          <ProductImageGallery
            product={product}
            IMAGES={IMAGES}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
            activeImageUrl={activeImageUrl}
            imageZoom={imageZoom}
            handleImageZoomMove={handleImageZoomMove}
            hideImageZoom={hideImageZoom}
            discPct={discPct}
            offerTags={offerTags}
          />

          {/* RIGHT — Product details (span 7) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <ProductMeta
                product={product}
                productTags={productTags}
                wishlisted={wishlisted}
                wishlistMut={wishlistMut}
                isAuthenticated={isAuthenticated}
                navigate={navigate}
                isExpanded={isExpanded}
                benefits={benefits}
                StarRow={StarRow}
              />
              <ProductPricing pack={pack} product={product} discPct={discPct} />
              <ProductPackSelector
                PACKS={PACKS}
                packIdx={packIdx}
                setPackIdx={setPackIdx}
              />
              <ProductActions
                qty={qty}
                setQty={setQty}
                handleAddToCart={handleAddToCart}
                handleBuyNow={handleBuyNow}
                addMut={addMut}
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-5 w-full lg:mt-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-4">
            <div className="flex-1">
              <ProductOffers OFFERS={OFFERS} />
            </div>
            <div className="w-full lg:w-[350px]">
              <ProductPincodeCheck
                pincode={pincode}
                setPincode={setPincode}
                pincodeMsg={pincodeMsg}
                setPincodeMsg={setPincodeMsg}
                checkPincode={checkPincode}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          TABS — Geometric minimal
         ═══════════════════════════════════════════════════════════ */}
      <ProductTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        TABS={TABS}
        fadeInUp={fadeInUp}
        product={product}
        activeImageUrl={activeImageUrl}
        benefits={benefits}
        warnings={warnings}
        howToUse={howToUse}
        ingredients={ingredients}
        ingredientCards={ingredientCards}
        getMatchingIngredientPill={getMatchingIngredientPill}
        showSelectedIngredient={showSelectedIngredient}
        selectedIngredientCards={selectedIngredientCards}
        previewIngredientPill={previewIngredientPill}
        activeIngredientPill={activeIngredientPill}
        setActiveIngredientPill={setActiveIngredientPill}
        setHoveredIngredientPill={setHoveredIngredientPill}
        setShowIngredientModal={setShowIngredientModal}
        showIngredientModal={showIngredientModal}
      />

      {/* ═══════════════════════════════════════════════════════════
          BRAND PROMISE SECTION
         ═══════════════════════════════════════════════════════════ */}
      <motion.div
        {...fadeInUp}
        className="max-w-[1400px] mx-auto px-3 lg:px-4 py-12"
      >
        <div className="rounded-[32px] border border-[var(--color-sage)]/18 bg-[linear-gradient(180deg,rgba(130,155,28,0.08),rgba(255,255,255,0.95))] p-8 lg:p-12 shadow-[0_22px_60px_rgba(47,51,40,0.08)] relative overflow-hidden">
          {/* Decorative accents */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--color-sage-light)]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[var(--color-sage-light)]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center relative z-10">
            <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight text-[#111827]">
              Made of Nature, Crafted With Science
            </h3>
            <div className="mx-auto mt-4 inline-flex items-center justify-center rounded-2xl border border-[var(--color-sage)]/20 bg-white/80 px-6 py-2.5 text-[14px] font-semibold text-[var(--color-text)] shadow-sm backdrop-blur-md">
              Fulfilling Wellness Needs For Your Best Tomorrow
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-3 lg:grid-cols-6 relative z-10">
            {[
              { icon: FlaskConical, label: "Scientifically Tested Formulations" },
              { icon: ScrollText, label: "Made With Ancient Traditional Recipes" },
              { icon: Timer, label: "Long-Lasting Results" },
              { icon: Shield, label: "Safe & Effective" },
              { icon: BadgeCheck, label: "GMP Certified" },
              { icon: Leaf, label: "Vegan & Natural Herbs" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[var(--color-sage)] shadow-[0_16px_40px_rgba(47,51,40,0.08)] ring-1 ring-[var(--color-sage)]/12 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[var(--color-sage)] group-hover:text-white">
                    <Icon size={28} />
                  </div>
                  <p className="mt-4 text-sm font-bold text-[#111827] leading-tight max-w-[140px]">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          RELATED PRODUCTS
         ═══════════════════════════════════════════════════════════ */}
      <motion.div
        {...fadeInUp}
        className="max-w-[1400px] mx-auto px-3 lg:px-4 pb-16"
      >
        <RelatedProduct />
      </motion.div>

      <FAQ productName={product.productName} />

      {/* ═══════════════════════════════════════════════════════════
          STICKY BOTTOM BAR (mobile)
         ═══════════════════════════════════════════════════════════ */}
      <ProductStickyBar
        pack={pack}
        product={product}
        handleAddToCart={handleAddToCart}
        handleBuyNow={handleBuyNow}
        addMut={addMut}
      />
    </div>
  );
}
