import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCart,
  updateCartItem,
  removeFromCart,
} from "../services/cartService";
import { applyCoupon as applyCouponApi } from "../services/couponService";
import { Truck } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import CartHeader from "./cart/CartHeader";
import CartItem from "./cart/CartItem";
import CartCoupon from "./cart/CartCoupon";
import CartSummary from "./cart/CartSummary";
import EmptyCart from "./cart/EmptyCart";

export default function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const qc = useQueryClient();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [removingId, setRemovingId] = useState(null);

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const updateMut = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeMut = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  const couponMut = useMutation({
    mutationFn: applyCouponApi,
    onSuccess: (result) => {
      setAppliedCoupon({
        code: result.couponCode,
        discountAmount: Number(result.discountAmount) || 0,
      });
      setCouponSuccess("Coupon applied successfully");
      setCouponError("");
    },
    onError: (err) => {
      setAppliedCoupon(null);
      setCouponSuccess("");
      setCouponError(err.response?.data?.message || "Invalid coupon code");
    },
  });

  const { mutate: applyCouponMutate, isPending: isCouponPending } = couponMut;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryCode = params.get("coupon");
    const storedCode = localStorage.getItem("applied_coupon_code");
    const nextCode = (queryCode || storedCode || "").trim().toUpperCase();

    if (!nextCode) return;
    if (appliedCoupon?.code) return;
    if (isCouponPending) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCoupon(nextCode);
    applyCouponMutate(nextCode);
  }, [location.search, appliedCoupon?.code, isCouponPending, applyCouponMutate]);

  const cartItems = (cartData?.data || []).map((item) => {
    const imageRaw = item.product?.productImages;
    let imageSrc = "https://placehold.co/400x400";
    if (Array.isArray(imageRaw) && imageRaw.length > 0) {
      imageSrc = imageRaw[0]?.url || imageRaw[0];
    } else if (typeof imageRaw === "string") {
      imageSrc = imageRaw;
    } else if (item.product?.image) {
      imageSrc = item.product.image;
    }
    return {
      id: item.id,
      productId: item.productId,
      name: item.product?.productName || "Unknown Product",
      category: "Product",
      price:
        Number(item.product?.finalPrice) || Number(item.product?.price) || 0,
      originalPrice: Number(item.product?.price) || 0,
      qty: item.quantity,
      image: { url: imageSrc },
      badge: "",
      tags: [],
    };
  });

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const mrpTotal = cartItems.reduce((s, i) => s + i.originalPrice * i.qty, 0);
  const savings = mrpTotal - subtotal;
  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const delivery = subtotal >= 999 && subtotal > 0 ? 0 : 79;
  const total = subtotal > 0 ? subtotal - discount + delivery : 0;
  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);

  const updateQty = (productId, delta) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;
    updateMut.mutate({ productId, quantity: Math.max(1, item.qty + delta) });
  };
 
  const removeItem = (productId) => {
    setRemovingId(productId);
    removeMut.mutate(productId);
    setTimeout(() => setRemovingId(null), 400);
  };

  const onApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    couponMut.mutate(code);
  };

  const handleCheckout = () => {
    if (appliedCoupon?.code) {
      localStorage.setItem("applied_coupon_code", appliedCoupon.code);
    } else {
      localStorage.removeItem("applied_coupon_code");
    }
    navigate("/checkout");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="label text-[var(--color-text-muted)]">
          Loading your cart...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <CartHeader totalItems={totalItems} />

      {cartItems.length > 0 && (
        <div className="bg-[var(--color-bg-soft)] border-b border-[var(--color-border)]">
          <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-3 flex items-center gap-4">
            <Truck size={14} className="text-[var(--color-sage)] shrink-0" />
            <div className="flex-1 h-1.5 bg-[var(--color-border)] rounded-full relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-[var(--color-sage)] rounded-full transition-all duration-700"
                style={{ width: `${Math.min((subtotal / 999) * 100, 100)}%` }}
              />
            </div>
            <p className="font-body text-[11px] tracking-[0.08em] font-medium text-[var(--color-text-secondary)] shrink-0">
              {delivery === 0
                ? "Free Shipping Unlocked"
                : `₹${999 - subtotal} away from free shipping`}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-10 lg:py-14">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
            <div className="w-full lg:flex-1 min-w-0">
              <div className="divide-y divide-[var(--color-border)]">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQty={updateQty}
                      onRemove={removeItem}
                      isRemoving={removingId === item.id}
                    />
                  ))}
                </AnimatePresence>
              </div>

              <CartCoupon
                coupon={coupon}
                setCoupon={setCoupon}
                onApply={onApplyCoupon}
                isPending={couponMut.isPending}
                error={couponError}
                success={couponSuccess}
              />
            </div>

            <CartSummary
              cartItems={cartItems}
              mrpTotal={mrpTotal}
              subtotal={subtotal}
              savings={savings}
              discount={discount}
              delivery={delivery}
              total={total}
              totalItems={totalItems}
              appliedCoupon={appliedCoupon}
              onRemoveCoupon={() => {
                setAppliedCoupon(null);
                setCouponSuccess("");
                setCoupon("");
              }}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
}
