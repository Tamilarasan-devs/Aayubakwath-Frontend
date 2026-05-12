import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWishlist, removeFromWishlist } from "../services/wishlistService";
import { addToCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import WishlistHeader from "./wishlist/WishlistHeader";
import WishlistItem from "./wishlist/WishlistItem";
import EmptyWishlist from "./wishlist/EmptyWishlist";
import WishlistSummaryBar from "./wishlist/WishlistSummaryBar";

export default function WishlistPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const [addingToCart, setAddingToCart] = useState({});

  const {
    data: wishlistData,
    isLoading,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: isAuthenticated,
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Removed from wishlist");
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  const cartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Added to cart");
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        toast.error("Please login first");
        navigate("/login");
      } else {
        toast.error("Failed to add to cart");
      }
    },
  });

  const handleRemove = (id) => {
    removeMutation.mutate(id);
  };

  const handleAddToCart = async (product) => {
    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));
    try {
      await cartMutation.mutateAsync({ productId: product.id, quantity: 1 });
    } finally {
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  const wishlist = wishlistData?.data || [];
  const totalSaved = wishlist.reduce((acc, item) => {
    const product = item.product;
    return acc + (product ? product.price - product.finalPrice : 0);
  }, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="text-gray-400 animate-spin" />
          <p className="text-gray-400 font-medium">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <WishlistHeader count={wishlist.length} totalSaved={totalSaved} />

      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-10">
        {wishlist.length === 0 && <EmptyWishlist />}

        {wishlist.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {wishlist.map((item) => (
                <WishlistItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onAddToCart={handleAddToCart}
                  isRemoving={
                    removeMutation.isPending &&
                    removeMutation.variables === item.id
                  }
                  inCart={addingToCart[item.product?.id]}
                />
              ))}
            </div>

            <WishlistSummaryBar
              count={wishlist.length}
              totalSaved={totalSaved}
              onAddAll={() => wishlist.forEach((i) => handleAddToCart(i.product))}
            />
          </>
        )}
      </div>
    </div>
  );
}
