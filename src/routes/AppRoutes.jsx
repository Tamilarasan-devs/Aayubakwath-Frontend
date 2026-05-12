import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Layout from "../components/layout/Layout";
import OfferModal from "../components/layout/OfferModel";
import ErrorBoundary from "../components/common/ErrorBoundary";
import { AuthProvider } from "../context/AuthContext";

/* ─── Scroll to top on route change ─── */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ─── Loading Fallback ─── */
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh] bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-[3px] border-[rgba(17,17,17,0.08)]" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#111827] animate-spin-fast" />
      </div>
      <p className="text-xs font-semibold text-[#111827] tracking-[0.15em] uppercase">
        Loading…
      </p>
    </div>
  </div>
);

/* ─── Lazy Loaded Pages ─── */
const Home = lazy(() => import("../pages/Home"));
const LoginPage = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const BlogPage = lazy(() => import("../pages/Blog"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));
const CartCheckout = lazy(() => import("../pages/Cart"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const WishlistPage = lazy(() => import("../pages/WishlistPage"));
const Dealership = lazy(() => import("../pages/Dealership"));
const Checkout = lazy(() => import("../pages/Checkout"));
const NewAbout = lazy(() => import("../pages/NewAbout"));

/* Lazy Loaded Components */
const ProductListingPage = lazy(() =>
  import("../components/product/ProductListingPage")
);
const SingleProduct = lazy(() =>
  import("../components/product/SingleProduct")
);
const CategoryList = lazy(() =>
  import("../components/product/CategoryList")
);
const ProductGrid = lazy(() =>
  import("../components/product/ProductGrid")
);
const ClientReview = lazy(() =>
  import("../components/clientReview/ClientReview")
);
const OfferScrollBar = lazy(() =>
  import("../components/layout/OfferScrollBar")
);
const Banner = lazy(() => import("../components/layout/Banner"));

/* Lazy Loaded Help/Support pages */
const TrackOrder = lazy(() => import("../components/product/TrackOrder"));
const ShippingPolicy = lazy(() => import("../pages/help-support/ShippingPolicy"));
const TermsOfService = lazy(() => import("../pages/help-support/TermsConditions"));
const Policy = lazy(() => import("../pages/help-support/Policy"));
const RefundPolicy = lazy(() => import("../pages/help-support/RefundPolicy"));
const Faq = lazy(() => import("../pages/help-support/Faq"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <OfferModal />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/scroll-bar" element={<OfferScrollBar />} />
                <Route path="/banner" element={<Banner />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/productListing" element={<ProductListingPage />} />
                <Route path="/cart" element={<CartCheckout />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/dealership" element={<Dealership />} />
                <Route path="/aboutpage" element={<NewAbout />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="/categorylist" element={<CategoryList />} />
                <Route path="/productgrid" element={<ProductGrid />} />
                <Route path="/clientreview" element={<ClientReview />} />
                <Route path="/trackorder" element={<TrackOrder />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<Policy />} />
                <Route path="/returns" element={<RefundPolicy />} />
                <Route path="/faq" element={<Faq />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
}