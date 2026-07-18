import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProfile, addAddress } from "../services/userService";
import { getCart } from "../services/cartService";
import { createOrder, verifyPayment } from "../services/orderService";
import CheckoutSteps from "./checkout/CheckoutSteps";
import AddressSelector from "./checkout/AddressSelector";
import NewAddressForm from "./checkout/NewAddressForm";
import OrderSummary from "./checkout/OrderSummary";
import { useAuth } from "../hooks/useAuth";

export default function Checkout() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { isAuthenticated, openCheckoutAuthModal } = useAuth();
  const [step] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to proceed with checkout.");
      navigate("/cart");
      setTimeout(() => {
        openCheckoutAuthModal();
      }, 100);
    }
  }, [isAuthenticated, navigate, openCheckoutAuthModal]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");

  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: isAuthenticated,
  });

  const { data: cartData, isLoading: isCartLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const handleSuccess = () => {
    qc.invalidateQueries({ queryKey: ["cart"] });
    qc.invalidateQueries({ queryKey: ["orders"] });
    localStorage.removeItem("applied_coupon_code");
    toast.success("Order placed successfully!");
    navigate("/profile");
  };

  const orderMut = useMutation({
    mutationFn: createOrder,
    onSuccess: (res) => {
      const order = res?.data;  // backend wraps in { data: order }
      if (order?.razorpayOrderId) {
        // Online payment — launch Razorpay popup
        if (!window.Razorpay) {
          toast.error("Payment gateway failed to load. Please refresh and try again.");
          return;
        }
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_TEq2YcknyFvIQL",
          amount: Math.round(Number(order.totalAmount) * 100),
          currency: "INR",
          name: "Aayubakwath",
          description: "Order Payment",
          order_id: order.razorpayOrderId,
          handler: async (response) => {
            try {
              await verifyPayment({
                orderId: order.id,
                razorpayOrderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              });
              handleSuccess();
            } catch (err) {
              console.error("Payment verification error:", err);
              toast.error(err?.response?.data?.message || "Payment verification failed. Please contact support.");
            }
          },
          prefill: {
            name: userProfile?.name || "",
            email: userProfile?.email || "",
            contact: userProfile?.phoneNumber || "",
          },
          theme: {
            color: "#6b8e6b",
          },
          modal: {
            ondismiss: () => {
              toast.info("Payment cancelled. Your order is saved — you can retry payment from your profile.");
            },
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
          console.error("Razorpay payment failed:", response.error);
          toast.error(`Payment failed: ${response.error?.description || "Please try again."}`);
        });
        rzp.open();
      } else {
        // COD — order is confirmed
        handleSuccess();
      }
    },
    onError: (err) => {
      console.error("Order creation error:", err);
      toast.error(err.response?.data?.message || "Failed to place order.");
    },
  });

  const addressMut = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      setNewAddress("");
    },
  });

  if (isUserLoading || isCartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="label text-[var(--color-text-muted)]">
          Loading Checkout...
        </p>
      </div>
    );
  }

  const addresses = userProfile?.addresses || [];
  const cartItems = cartData?.data || [];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-5">
        <h2
          className="display-heading text-[var(--color-text)]"
          style={{ fontSize: "2rem" }}
        >
          Your cart is empty!
        </h2>
        <button
          onClick={() => navigate("/productListing")}
          className="btn-primary"
        >
          Shop Now
        </button>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (acc, curr) =>
      acc +
      curr.quantity *
        parseFloat(curr.product?.finalPrice || curr.product?.price || 0),
    0,
  );
  const shipping = subtotal >= 999 ? 0 : 79;

  const handlePlaceOrder = () => {
    if (!selectedAddress && !newAddress.trim()) {
      toast.error("Please select or enter a shipping address.");
      return;
    }

    const finalAddress = selectedAddress || newAddress;
    
    let shippingAddress;
    if (typeof finalAddress === "object" && finalAddress !== null) {
      shippingAddress = {
        name: finalAddress.name || "",
        phone: finalAddress.phone || "",
        doorNumber: finalAddress.doorNumber || "",
        area: finalAddress.area || "",
        street: finalAddress.street || `${finalAddress.doorNumber}, ${finalAddress.area}`.trim() || "",
        landmark: finalAddress.landmark || "",
        city: finalAddress.city || "",
        state: finalAddress.state || "",
        postalCode: finalAddress.postalCode || "",
        country: finalAddress.country || "India",
      };
    } else {
      // Fallback for string addresses if any exist
      const addressParts = finalAddress.split(",").map((s) => s.trim());
      shippingAddress = {
        name: userProfile?.name || "Customer",
        phone: userProfile?.phoneNumber || "",
        doorNumber: addressParts[0] || "",
        area: addressParts.slice(1, -3).join(", ") || "Main Street",
        city: addressParts.length > 2 ? addressParts[addressParts.length - 3] : "Tiruppur",
        state: addressParts.length > 1 ? addressParts[addressParts.length - 2] : "Tamil Nadu",
        postalCode: addressParts[addressParts.length - 1] || "641662",
        country: "India",
      };
    }

    const couponCode = localStorage.getItem("applied_coupon_code") || undefined;
    orderMut.mutate({ shippingAddress, couponCode, paymentMethod });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-[var(--color-border)] bg-white">
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-8">
        
           <div className="flex items-center justify-center gap-4 py-4">
          <div className="w-8 h-px bg-[var(--color-sage)]" />
          <p
            className="label whitespace-nowrap"
            style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)", fontWeight: "500" }}
          >
              Checkout  
          </p>
          <div className="w-8 h-px bg-[var(--color-sage)]" />
        </div>
          <h1
            className="display-heading text-[var(--color-text)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Complete Your Order
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-10 lg:py-14">
        <CheckoutSteps step={step} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <div className="bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-sm)]">
            <h2
              className="display-heading text-[var(--color-text)] mb-6"
              style={{ fontSize: "1.6rem" }}
            >
              Delivery Address
            </h2>

            <AddressSelector
              addresses={addresses}
              selectedAddress={selectedAddress}
              onSelect={(addr) => {
                setSelectedAddress(addr);
                setNewAddress("");
              }}
            />

            <NewAddressForm
              newAddress={newAddress}
              setNewAddress={setNewAddress}
              setSelectedAddress={setSelectedAddress}
              onSave={(addr) => addressMut.mutate(addr)}
              isSaving={addressMut.isPending}
              hasAddresses={addresses.length > 0}
            />

            <div className="mt-8 border-t border-[var(--color-border)] pt-8">
              <h2
                className="display-heading text-[var(--color-text)] mb-6"
                style={{ fontSize: "1.6rem" }}
              >
                Payment Method
              </h2>
              <div className="space-y-4">
                <label
                  className={`flex items-center p-4 border rounded-[var(--radius-md)] cursor-pointer transition-all ${
                    paymentMethod === "ONLINE"
                      ? "border-[var(--color-sage)] bg-[var(--color-sage-light)]/10"
                      : "border-[var(--color-border)] hover:border-[var(--color-sage)]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ONLINE"
                    checked={paymentMethod === "ONLINE"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-[var(--color-sage)] focus:ring-[var(--color-sage)] cursor-pointer"
                  />
                  <span className="ml-3 font-medium text-[var(--color-text)]">
                    Pay Online (Razorpay)
                  </span>
                </label>

                <label
                  className={`flex items-center p-4 border rounded-[var(--radius-md)] cursor-pointer transition-all ${
                    paymentMethod === "COD"
                      ? "border-[var(--color-sage)] bg-[var(--color-sage-light)]/10"
                      : "border-[var(--color-border)] hover:border-[var(--color-sage)]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-[var(--color-sage)] focus:ring-[var(--color-sage)] cursor-pointer"
                  />
                  <span className="ml-3 font-medium text-[var(--color-text)]">
                    Cash on Delivery
                  </span>
                </label>
              </div>
            </div>
          </div>

          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            paymentMethod={paymentMethod}
            onPlaceOrder={handlePlaceOrder}
            isPending={orderMut.isPending}
          />
        </div>
      </div>
    </div>
  );
}
