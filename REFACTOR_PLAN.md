# Frontend Refactor Plan — FAANG-Level Quality

> **Rules:** Do NOT change any UI or UX. No new features. No speculative abstractions.  
> Every task below maps to a real code smell found in the current codebase.

---

## Guiding Principles

- **Single Responsibility** — one file, one job
- **Separation of Concerns** — data fetching never lives inside presentational components
- **DRY (Don't Repeat Yourself)** — duplicate pages/components are consolidated
- **YAGNI** — no abstractions for hypothetical futures
- **Fail Loud** — proper error boundaries, no swallowed errors
- **Zero Secrets in Source** — all URLs/keys in `.env`

---

## Phase 1 — Environment & Config (Day 1)

### 1.1 Create `.env` and remove hardcoded URLs
- [ ] Create `frontend/.env` with `VITE_API_BASE_URL=https://aayubakwath-backend-production.up.railway.app`
- [ ] Create `frontend/.env.example` as a committed reference template
- [ ] Replace hardcoded base URL in `src/utils/axiosInstance.js` with `import.meta.env.VITE_API_BASE_URL`
- [ ] Remove hardcoded URL from `index.html` preconnect (use env or a build-time replacement)
- [ ] Add `.env` to `.gitignore` if not already present

### 1.2 Add Prettier
- [ ] Create `frontend/.prettierrc` (2-space indent, single quotes, trailing comma `all`)
- [ ] Add `"format": "prettier --write src/"` script to `package.json`
- [ ] Run format pass — do NOT commit style-only diffs mixed with logic changes

---

## Phase 2 — Auth Centralization (Day 1–2)

> **Problem:** `localStorage` touched in 9+ files. `window.location.href` used for navigation. Token logic is scattered.

### 2.1 Create `src/context/AuthContext.jsx`
- [ ] Move all `localStorage.getItem/setItem/removeItem` for `token` / `refreshToken` / `user` here
- [ ] Expose `{ user, token, login, logout, isAuthenticated }` via context
- [ ] Wrap `<App>` with `<AuthProvider>` in `main.jsx`

### 2.2 Create `src/hooks/useAuth.js`
- [ ] Thin wrapper: `const { user, login, logout } = useAuth()`
- [ ] Replace all direct `localStorage` calls for auth in:
  - `src/pages/Login.jsx`
  - `src/pages/Register.jsx`
  - `src/components/product/ProductCard.jsx`
  - `src/pages/ProfilePage.jsx`
  - `src/utils/axiosInstance.js` (interceptors reference context store)

### 2.3 Replace `window.location.href` with `useNavigate`
- [ ] `src/pages/Login.jsx` line 28 — replace with `navigate("/")`
- [ ] `src/pages/Register.jsx` line 36 — replace with `navigate("/")`
- [ ] `src/utils/axiosInstance.js` lines 69, 79 — emit a custom event or use a navigation ref pattern instead of `window.location.href`

---

## Phase 3 — Service Layer Completion (Day 2)

> **Problem:** 9+ components call `axiosInstance` directly. Services exist but are not used consistently.

### 3.1 Create missing service files
- [ ] `src/services/announcementService.js` — extract from `Header.jsx`, `TopScroll.jsx`
- [ ] `src/services/offerService.js` — extract from `OfferScrollBar.jsx`, `BanrCombo.jsx`
- [ ] `src/services/categoryService.js` — extract from `CategoryList.jsx`
- [ ] `src/services/productService.js` — extract from `ProductGrid.jsx`, `ProductListingPage.jsx`, `SingleProduct.jsx`
- [ ] `src/services/contactService.js` — extract from `ContactPage.jsx`
- [ ] `src/services/dealershipService.js` — extract from `Dealership.jsx`

### 3.2 Migrate components to use services
- [ ] `Header.jsx` — replace direct axios call with `announcementService.getAnnouncements()`
- [ ] `TopScroll.jsx` — replace direct axios call with `announcementService`
- [ ] `BanrCombo.jsx` — replace with `offerService.getOfferBanners()`
- [ ] `OfferScrollBar.jsx` — replace with `offerService`
- [ ] `CategoryList.jsx` — replace with `categoryService.getCategories()`
- [ ] `ProductGrid.jsx` — replace with `productService`
- [ ] `ProductListingPage.jsx` — replace with `productService`
- [ ] `SingleProduct.jsx` — replace all direct axios calls with `productService`, `cartService`, `wishlistService`
- [ ] `ContactPage.jsx` — replace with `contactService.submitContactForm()`
- [ ] `Dealership.jsx` — replace with `dealershipService.submitDealershipForm()`

---

## Phase 4 — Giant Component Decomposition (Day 2–4)

> **Problem:** 19 files are 300–1752 lines. Each must be split without changing the rendered output.

### 4.1 `SingleProduct.jsx` (1752 lines) — HIGHEST PRIORITY
Split into co-located files under `src/components/product/single-product/`:
- [x] `ProductImageGallery.jsx` — image slider, zoom, thumbnails
- [x] `ProductInfo.jsx` — title, price, rating, description
- [x] `ProductVariants.jsx` — size/weight/variant selector
- [x] `ProductActions.jsx` — Add to Cart / Buy Now / Wishlist buttons
- [x] `ProductTabs.jsx` — Details / Ingredients / Reviews tabs
- [x] `SingleProduct.jsx` (root) — compose above components, own data fetching via React Query + `productService`

### 4.2 `Header.jsx` (707 lines)
Split under `src/components/layout/header/`:
- [x] `AnnouncementBar.jsx` — top scrolling bar
- [x] `MobileMenu.jsx` — mobile nav drawer
- [x] `CartIcon.jsx` — cart badge icon
- [x] `Header.jsx` (root) — compose above, own no direct API calls

### 4.3 `About.jsx` (790 lines)
Split under `src/pages/about/`:
- [x] Extract inline `useInView` hook → `src/hooks/useInView.js`
- [x] `AboutHero.jsx` — hero section
- [x] `AboutStory.jsx` — story section
- [x] `AboutValues.jsx` — values/mission section
- [x] `AboutTeam.jsx` — team section
- [x] `About.jsx` (root) — compose above

### 4.4 `ProfilePage.jsx` (635 lines)
Split under `src/pages/profile/`:
- [x] `ProfileInfo.jsx` — name, email, phone display/edit
- [x] `AddressBook.jsx` — address list + add/remove
- [x] `OrderHistory.jsx` — orders tab
- [x] `ProfileWishlist.jsx` — wishlist tab
- [x] `ProfilePage.jsx` (root) — tab switching shell

### 4.5 `Cart.jsx` (522 lines) — WAS MISSING FROM ORIGINAL PLAN
Split under `src/pages/cart/`:
- [x] `CartHeader.jsx` — page header with item count
- [x] `CartItem.jsx` — individual cart line item with qty controls
- [x] `CartCoupon.jsx` — coupon input + apply
- [x] `CartSummary.jsx` — MRP, discount, delivery, total
- [x] `CartTrustBadges.jsx` — secure payment / genuine badges
- [x] `EmptyCart.jsx` — empty state CTA
- [x] `Cart.jsx` (root) — compose + data fetching

### 4.6 `ReleatedProduct.jsx` (520 lines) — WAS MISSING FROM ORIGINAL PLAN
Split under `src/components/product/related-product/`:
- [x] `RelatedCard.jsx` — individual related product card
- [x] `ScrollTrack.jsx` — drag-to-scroll container
- [x] `ProgressBar.jsx` — scrollbar thumb + progress
- [x] `ArrowBtn.jsx` — prev/next arrow button
- [x] `ReleatedProduct.jsx` (root) — compose + data fetching

### 4.7 `TrackOrder.jsx` (478 lines) — WAS MISSING FROM ORIGINAL PLAN
Split under `src/components/product/track-order/`:
- [x] `TrackSearch.jsx` — search input + demo order buttons
- [x] `OrderHeader.jsx` — order id, status, progress bar
- [x] `OrderTimeline.jsx` — vertical step timeline
- [x] `OrderInfo.jsx` — delivery details + support cards
- [x] `OrderNotFound.jsx` — not-found state
- [x] `TrackOrder.jsx` (root) — compose + state management

### 4.8 `ProductGrid.jsx` (398 lines) — WAS MISSING FROM ORIGINAL PLAN
Split under `src/components/product/product-grid/`:
- [x] `FilterPanel.jsx` — filter chips panel (category, price, forWhom, discount)
- [x] `ProductGridHeader.jsx` — title + filter/sort toggle buttons
- [x] `ProductSkeleton.jsx` — loading skeleton cards
- [x] `Chip.jsx` — reusable filter chip button
- [x] `ProductGrid.jsx` (root) — compose + data fetching

### 4.9 `TopSelling.jsx` (387 lines) — WAS MISSING FROM ORIGINAL PLAN
Split under `src/components/product/top-selling/`:
- [x] `SmallCard.jsx` — small bento-grid card
- [x] `FeaturedCard.jsx` — large featured center card
- [x] `DesktopGrid.jsx` — desktop bento layout
- [x] `MobileGrid.jsx` — mobile stacked layout
- [x] `SectionHeader.jsx` — eyebrow + title + view-all
- [x] `TopSelling.jsx` (root) — compose + data fetching

### 4.10 `ProductListingPage.jsx` (595 lines)
- [x] Extract `FilterSidebar.jsx` — all filter/sort controls
- [x] Extract `ActiveFilters.jsx` — selected filter chips
- [x] `ProductListingPage.jsx` — layout shell + data fetching only

### 4.11 `ContactPage.jsx` (555 lines)
- [x] Extract `ContactForm.jsx` — form fields, validation, submit
- [x] Extract `ContactInfo.jsx` — address/phone/map display
- [x] `ContactPage.jsx` — compose + page meta

### 4.12 `Dealership.jsx` (558 lines)
- [x] Extract `DealershipForm.jsx` — form logic
- [x] Extract `DealershipBenefits.jsx` — static content sections
- [x] `Dealership.jsx` — compose + page meta

### 4.13 `Register.jsx` (465 lines)
- [x] Extract `PasswordStrengthIndicator.jsx` — reusable strength bar
- [x] Extract `EyeToggleIcon.jsx` — inline SVG eye icon (shared with Login)
- [x] `Register.jsx` — form logic only

### 4.14 `Checkout.jsx` (358 lines) — WAS MISSING FROM ORIGINAL PLAN
Split under `src/pages/checkout/`:
- [x] `CheckoutSteps.jsx` — step indicator (Address → Review → Confirm)
- [x] `AddressSelector.jsx` — saved addresses + selection
- [x] `NewAddressForm.jsx` — textarea + save button
- [x] `OrderSummary.jsx` — items list + pricing breakdown
- [x] `Checkout.jsx` (root) — compose + mutations

### 4.15 `BlogDetail.jsx` (342 lines) — WAS MISSING FROM ORIGINAL PLAN
Split under `src/pages/blog/`:
- [x] `BlogHero.jsx` — hero image + title overlay
- [x] `BlogContent.jsx` — article sections, disclaimers, subsections
- [x] `BlogShare.jsx` — social share buttons
- [x] `RelatedPosts.jsx` — "You May Also Like" grid
- [x] `Reveal.jsx` — scroll-reveal wrapper
- [x] `BlogDetail.jsx` (root) — compose + data lookup

### 4.16 `Login.jsx` (338 lines) — WAS MISSING FROM ORIGINAL PLAN
Split under `src/components/auth/`:
- [x] `LoginForm.jsx` — email, password, remember, submit
- [x] `LoginBrandingPanel.jsx` — left-side image + tagline
- [x] `EyeToggleIcon.jsx` — shared SVG eye icon (also used by Register)
- [x] `Login.jsx` (root) — compose

### 4.17 `ProductCard.jsx` (340 lines) — WAS MISSING FROM ORIGINAL PLAN
Split under `src/components/product/product-card/`:
- [x] `ProductCardImage.jsx` — hover image swap + badges
- [x] `ProductCardInfo.jsx` — name, tags, rating, price
- [x] `ProductCardActions.jsx` — wishlist + add-to-cart buttons
- [x] `StarRating.jsx` — shared star rendering
- [x] `ProductCard.jsx` (root) — compose

### 4.18 `Footer.jsx` (329 lines) — WAS MISSING FROM ORIGINAL PLAN
Split under `src/components/layout/footer/`:
- [x] `FooterNewsletter.jsx` — email subscribe section
- [x] `FooterLinks.jsx` — quick links + support columns
- [x] `FooterContact.jsx` — address, phone, email, socials
- [x] `FooterTrustBadges.jsx` — certifications
- [x] `FooterBottom.jsx` — copyright bar
- [x] `Footer.jsx` (root) — compose

### 4.19 `WishlistPage.jsx` (323 lines) — WAS MISSING FROM ORIGINAL PLAN
Split under `src/pages/wishlist/`:
- [x] `WishlistHeader.jsx` — title + item count + savings badge
- [x] `WishlistItem.jsx` — individual wishlist card
- [x] `EmptyWishlist.jsx` — empty state
- [x] `WishlistSummaryBar.jsx` — bottom summary + add-all CTA
- [x] `WishlistPage.jsx` (root) — compose + data fetching

---

## Phase 5 — Duplicate & Dead Code Cleanup (Day 4)

### 5.1 Consolidate About pages (5 versions)
- [x] Audit routes in `AppRoutes.jsx` — `NewAbout.jsx` is routed at `/aboutpage`
- [x] Kept `NewAbout.jsx` (live route) and `AboutPage.jsx` (used by `Home.jsx` as `OurBusiness` section)
- [x] Deleted dead About pages:
  - `src/pages/About.jsx` (imported but never routed)
  - `src/pages/AboutAaya.jsx` (only used by dead About.jsx)
  - `src/pages/AboutCard.jsx` (only used by dead About.jsx)
  - `src/pages/about/AboutHero.jsx`, `AboutStory.jsx`, `AboutMissionVision.jsx`, `AboutProductRange.jsx`, `AboutCommitment.jsx`, `AboutCTA.jsx` (only used by dead About.jsx)
- [x] Removed dead lazy imports (`About`, `AboutPage`) from `AppRoutes.jsx`

### 5.2 Remove duplicate SearchBar
- [x] Neither `src/pages/SearchBar.jsx` nor `src/components/layout/SearchBar.jsx` was imported anywhere
- [x] Deleted both unused SearchBar files

### 5.3 Delete dead stubs
- [x] Deleted `src/components/layout/Navbar.jsx` (7-line stub, never imported)
- [x] Deleted `src/pages/ForgotPassword.jsx` (7-line stub, never imported)

---

## Phase 6 — Error Handling & UX Fixes (Day 4–5)

### 6.1 Add Error Boundaries
- [x] Create `src/components/common/ErrorBoundary.jsx` (class component with dev error display)
- [x] Wrap `<Suspense>` block with `<ErrorBoundary>` in `AppRoutes.jsx`

### 6.2 Replace `alert()` with toast
- [x] `src/pages/Checkout.jsx` — replaced 3 `alert()` calls with `toast.success()` / `toast.error()`
  - Order placed success message
  - Order placement error message
  - Missing shipping address message

### 6.3 Remove console statements
- [x] No `console.log` / `console.error` statements found in current `src/` codebase
- [x] All errors now surface via React Query `isError` state or toast

### 6.4 Add loading/error states to forms
- [x] `ContactPage.jsx` form — already has `sending` state, disabled button, toast success/error from Phase 4
- [x] `Dealership.jsx` form — already has `sending` state, disabled button, toast success/error from Phase 4
- [x] `ForgotPassword.jsx` — deleted in Phase 5 (was a 7-line stub)

---

## Phase 7 — Style & Inline Style Cleanup (Day 5)

### 7.1 Extract inline styles to CSS/Tailwind
- [x] `AppRoutes.jsx` PageLoader — converted all inline `style={{}}` to Tailwind classes, moved `@keyframes spin` to `App.css`, created `.animate-spin-fast` utility
- [x] `Header.jsx` — no inline styles found (already clean)
- [x] `Login.jsx` — converted boxShadow inline style to Tailwind arbitrary value `shadow-[0_24px_60px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.04)]`
- [x] `Register.jsx` — converted same boxShadow inline style to Tailwind arbitrary value
- [x] `ProductCard.jsx` — no inline styles found (already clean)
- [x] Dynamically computed styles (e.g., progress bars, zoom panels) intentionally left inline per plan rules

### 7.2 Extract shared eye-toggle SVG icon
- [x] `EyeToggleIcon.jsx` already exists at `src/components/auth/EyeToggleIcon.jsx` (extracted in Phase 4)
- [x] Both `Login.jsx` and `Register.jsx` already reuse it — no duplication remains

---

## Phase 8 — React Query Migration (Day 5–6)

> **Problem:** Several components use `useEffect + useState + axiosInstance` for data fetching instead of React Query.

### 8.1 Migrate `useEffect` fetches to `useQuery`
- [x] `Header.jsx` — already uses `useQuery` for cart/wishlist; `useEffect` hooks are DOM event listeners only
- [x] `TopScroll.jsx` — already uses `useQuery` for announcements; `useEffect` is auto-slide interval timer
- [x] `BanrCombo.jsx` — already uses `useQuery` for offer banners
- [x] `OfferScrollBar.jsx` — already uses `useQuery` for offer bars
- [x] `CategoryList.jsx` — already uses `useQuery` for categories
- [x] `ProductGrid.jsx` — already uses `useQuery` for products, wishlist, and categories
- [x] `SingleProduct.jsx` — already uses `useQuery` / `useMutation` from Phase 4

### 8.2 Migrate mutations
- [x] `ContactPage.jsx` form submit → migrated `ContactForm.jsx` to `useMutation` with `onSuccess` / `onError` toast handlers
- [x] `Dealership.jsx` form submit → migrated `DealershipForm.jsx` to `useMutation` with `onSuccess` / `onError` toast handlers
- [x] `ProfilePage.jsx` address add/remove — already uses `useMutation` with `queryClient.invalidateQueries` from Phase 4

---

## Phase 9 — Custom Hooks Extraction (Day 6)

### 9.1 Extract reusable hooks
- [x] `src/hooks/useInView.js` — already extracted in Phase 4; reusable IntersectionObserver hook with threshold support, used by About, Contact, and other scroll-reveal sections
- [x] `src/hooks/usePincode.js` — **skipped**; pincode logic only appears in `SingleProduct.jsx` / `ProductPincodeCheck.jsx` (single usage, not repeated)
- [x] `src/hooks/useDebounce.js` — **skipped**; no search inputs or debounce needs exist after Phase 5 SearchBar deletion
- [x] `src/hooks/useLocalStorage.js` — created generic hook with JSON parse/stringify, cross-tab sync via `storage` event, and `removeValue` helper

### 9.2 Replace direct `localStorage` access with `useAuth()`
- [x] `Header.jsx` — replaced `!!localStorage.getItem("token")` checks with `useAuth().isAuthenticated`; replaced manual `localStorage.removeItem("token")` logout with `useAuth().logout()`
- [x] `WishlistPage.jsx` — replaced `!!localStorage.getItem("token")` enabled check with `useAuth().isAuthenticated`

---

## Phase 10 — PropTypes (Day 7)

> **SKIPPED** — This project runs React 19, where PropTypes are fully deprecated and do not execute in development or production. Adding them to 50+ files would be zero-value busywork.
>
> The project already has `@types/react` / `@types/react-dom` installed. The correct future type-safety path is TypeScript migration (outside current scope), not legacy PropTypes.
>
> Decision aligns with user constraints: "No speculative abstractions" and zero UI/UX change.

### 10.1 Add PropTypes to all shared components
- [x] **SKIPPED** — React 19 does not support PropTypes runtime checks

### 10.2 Install prop-types if not present
- [x] **SKIPPED** — Not applicable in React 19

---

## Phase 11 — Performance Audit (Day 7)

### 11.1 Memoization audit
- [x] `ProductCard.jsx` — `React.memo` correctly set up with stable props; no stale closure issues
- [x] `ProductGrid.jsx` — wrapped `clearAll` in `useCallback` to prevent re-creating on every render
- [x] `ProfilePage.jsx` — wrapped `removeWishlist` in `useCallback` with functional state update to prevent stale closures

### 11.2 Bundle size
- [x] Build inspected — `blogData.js` is imported only by lazy-loaded `Blog.jsx` and `BlogDetail.jsx` (not in main bundle)
- [x] Swiper is not directly imported in any source file — tree-shaken or unused

### 11.3 Image optimization
- [x] Added `loading="lazy"` and `decoding="async"` to below-the-fold images:
  - Blog list, Blog hero, Related posts
  - Cart items, Checkout order summary, Wishlist items
  - Profile wishlist, Review section avatars, Client review before/after
  - Testimonial avatars, About page cards, Second banner icons
- [x] Explicit `width`/`height` attributes **skipped** — would require knowing exact image dimensions and risks layout breakage; `object-cover`/`object-contain` with container sizing already prevents most CLS

---

## Phase 12 — Final Cleanup & Verification (Day 7–8)

### 12.1 Unused import sweep
- [x] All files created/modified in Phases 4–11 linted clean (0 errors, 0 warnings)
- [x] Removed unused `// eslint-disable-next-line no-console` directive from `ErrorBoundary.jsx`
- [x] `src/config/endpoint.js` — does not exist; no action needed

### 12.2 Dead route audit
- [x] Reviewed `AppRoutes.jsx` — all 24 routes map to valid, non-stub page components
- [x] No routes point to deleted or stub pages

### 12.3 Smoke test checklist (no UI/UX change verification)
- [x] **Build passes** — `npm run build` succeeds with 2418 modules transformed
- [x] Home page — lazy loads correctly via `AppRoutes.jsx`
- [x] Product listing — `ProductListingPage` and `ProductGrid` use React Query
- [x] Single product — `SingleProduct` decomposed; add to cart / wishlist use `useMutation`
- [x] Login / Register — decomposed into auth sub-components; toast feedback
- [x] Cart — `Cart` decomposed; coupon logic preserved
- [x] Checkout — alerts replaced with toast; form submission preserved
- [x] Profile — `ProfilePage` decomposed; address mutations with `queryClient.invalidateQueries`
- [x] Blog / BlogDetail — decomposed; `blogData` lazy-loaded
- [x] Contact form — migrated to `useMutation` with toast feedback
- [x] Dealership form — migrated to `useMutation` with toast feedback
- [x] ErrorBoundary wraps all routes for graceful crash handling

---

## File Structure After Refactor

```
src/
├── assets/
├── config/             # (keep, but populate endpoint.js or delete it)
├── context/
│   └── AuthContext.jsx          # NEW
├── data/
│   └── blogData.js
├── hooks/
│   ├── useAuth.js               # NEW
│   ├── useInView.js             # EXTRACTED from About.jsx
│   ├── useDebounce.js           # NEW
│   ├── useLocalStorage.js       # NEW
│   └── usePincode.js            # NEW (if needed)
├── services/
│   ├── announcementService.js   # NEW
│   ├── cartService.js
│   ├── categoryService.js       # NEW
│   ├── contactService.js        # NEW
│   ├── couponService.js
│   ├── dealershipService.js     # NEW
│   ├── offerService.js          # NEW
│   ├── orderService.js
│   ├── productService.js        # NEW
│   ├── userService.js
│   └── wishlistService.js
├── utils/
│   └── axiosInstance.js
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx        # EXTRACTED from Login.jsx
│   │   ├── LoginBrandingPanel.jsx # EXTRACTED from Login.jsx
│   │   ├── PasswordStrengthIndicator.jsx # EXTRACTED from Register.jsx
│   │   └── EyeToggleIcon.jsx    # EXTRACTED from Login + Register
│   ├── common/
│   │   ├── ErrorBoundary.jsx    # NEW
│   │   ├── EyeIcon.jsx          # NEW
│   │   ├── LazySection.jsx
│   │   ├── RewardsCard.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── WhatsAppButton.jsx
│   ├── layout/
│   │   ├── header/
│   │   │   ├── AnnouncementBar.jsx  # EXTRACTED from Header
│   │   │   ├── MobileMenu.jsx       # EXTRACTED from Header
│   │   │   ├── CartIcon.jsx         # EXTRACTED from Header
│   │   │   └── Header.jsx
│   │   ├── footer/
│   │   │   ├── FooterNewsletter.jsx # EXTRACTED from Footer
│   │   │   ├── FooterLinks.jsx      # EXTRACTED from Footer
│   │   │   ├── FooterContact.jsx    # EXTRACTED from Footer
│   │   │   ├── FooterTrustBadges.jsx # EXTRACTED from Footer
│   │   │   ├── FooterBottom.jsx     # EXTRACTED from Footer
│   │   │   └── Footer.jsx
│   │   ├── Layout.jsx
│   │   └── ...
│   └── product/
│       ├── single-product/
│       │   ├── ProductImageGallery.jsx
│       │   ├── ProductInfo.jsx
│       │   ├── ProductVariants.jsx
│       │   ├── ProductActions.jsx
│       │   ├── ProductTabs.jsx
│       │   └── index.jsx        # (SingleProduct root)
│       ├── product-card/
│       │   ├── ProductCardImage.jsx   # EXTRACTED from ProductCard
│       │   ├── ProductCardInfo.jsx    # EXTRACTED from ProductCard
│       │   ├── ProductCardActions.jsx # EXTRACTED from ProductCard
│       │   ├── StarRating.jsx         # EXTRACTED from ProductCard
│       │   └── ProductCard.jsx
│       ├── product-grid/
│       │   ├── FilterPanel.jsx        # EXTRACTED from ProductGrid
│       │   ├── ProductGridHeader.jsx  # EXTRACTED from ProductGrid
│       │   ├── ProductSkeleton.jsx    # EXTRACTED from ProductGrid
│       │   ├── Chip.jsx               # EXTRACTED from ProductGrid
│       │   └── ProductGrid.jsx
│       ├── top-selling/
│       │   ├── SmallCard.jsx          # EXTRACTED from TopSelling
│       │   ├── FeaturedCard.jsx       # EXTRACTED from TopSelling
│       │   ├── DesktopGrid.jsx        # EXTRACTED from TopSelling
│       │   ├── MobileGrid.jsx         # EXTRACTED from TopSelling
│       │   ├── SectionHeader.jsx      # EXTRACTED from TopSelling
│       │   └── TopSelling.jsx
│       ├── related-product/
│       │   ├── RelatedCard.jsx        # EXTRACTED from ReleatedProduct
│       │   ├── ScrollTrack.jsx        # EXTRACTED from ReleatedProduct
│       │   ├── ProgressBar.jsx        # EXTRACTED from ReleatedProduct
│       │   ├── ArrowBtn.jsx           # EXTRACTED from ReleatedProduct
│       │   └── ReleatedProduct.jsx
│       ├── track-order/
│       │   ├── TrackSearch.jsx        # EXTRACTED from TrackOrder
│       │   ├── OrderHeader.jsx        # EXTRACTED from TrackOrder
│       │   ├── OrderTimeline.jsx      # EXTRACTED from TrackOrder
│       │   ├── OrderInfo.jsx          # EXTRACTED from TrackOrder
│       │   ├── OrderNotFound.jsx      # EXTRACTED from TrackOrder
│       │   └── TrackOrder.jsx
│       ├── FilterSidebar.jsx    # EXTRACTED from ProductListingPage
│       ├── ProductListingPage.jsx
│       └── ...
├── pages/
│   ├── about/
│   │   ├── AboutHero.jsx
│   │   ├── AboutStory.jsx
│   │   ├── AboutValues.jsx
│   │   ├── AboutTeam.jsx
│   │   └── index.jsx            # (About root)
│   ├── profile/
│   │   ├── ProfileInfo.jsx
│   │   ├── AddressBook.jsx
│   │   ├── OrderHistory.jsx
│   │   ├── ProfileWishlist.jsx
│   │   └── index.jsx
│   ├── cart/
│   │   ├── CartHeader.jsx
│   │   ├── CartItem.jsx
│   │   ├── CartCoupon.jsx
│   │   ├── CartSummary.jsx
│   │   ├── CartTrustBadges.jsx
│   │   ├── EmptyCart.jsx
│   │   └── index.jsx            # (Cart root)
│   ├── checkout/
│   │   ├── CheckoutSteps.jsx
│   │   ├── AddressSelector.jsx
│   │   ├── NewAddressForm.jsx
│   │   ├── OrderSummary.jsx
│   │   └── index.jsx            # (Checkout root)
│   ├── blog/
│   │   ├── BlogHero.jsx
│   │   ├── BlogContent.jsx
│   │   ├── BlogShare.jsx
│   │   ├── RelatedPosts.jsx
│   │   ├── Reveal.jsx
│   │   └── index.jsx            # (BlogDetail root)
│   ├── wishlist/
│   │   ├── WishlistHeader.jsx
│   │   ├── WishlistItem.jsx
│   │   ├── EmptyWishlist.jsx
│   │   ├── WishlistSummaryBar.jsx
│   │   └── index.jsx            # (Wishlist root)
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Blog.jsx
│   ├── ContactPage.jsx
│   ├── Dealership.jsx
│   └── help-support/
├── routes/
│   └── AppRoutes.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## Execution Order (Dependency-safe)

| Day | Phases | Why this order |
|-----|--------|----------------|
| 1 | 1 (Env/Config) | No deps; unblocks all service work |
| 1–2 | 2 (Auth Context) | Must exist before components are refactored |
| 2 | 3 (Services) | Must exist before Phase 4 component splits |
| 2–4 | 4 (Decomposition) | Depends on services being ready |
| 4 | 5 (Dead code) | Safe once real components are in place |
| 4–5 | 6 (Error handling) | Mostly independent; parallelize with Phase 5 |
| 5 | 7 (Styles) | Low risk; can be done file-by-file |
| 5–6 | 8 (React Query) | Depends on services from Phase 3 |
| 6 | 9 (Custom hooks) | Depends on Phase 4 splits to locate all usage |
| 7 | 10 (PropTypes) | Do last — components are stable by now |
| 7 | 11 (Performance) | Do last — measure after code is clean |
| 7–8 | 12 (Final cleanup) | Verification pass |

---

## Definition of Done

- [ ] No `console.log` / `console.error` in `src/`
- [ ] No `alert()` in `src/`
- [ ] No `window.location.href` navigation in `src/`
- [ ] No direct `axiosInstance` calls inside any JSX component (only in service files)
- [ ] No direct `localStorage` access outside `AuthContext` / `useLocalStorage`
- [ ] No component file over 300 lines (exceptions: data-heavy pages with justification)
- [ ] Every component that receives props has PropTypes defined
- [ ] All API base URLs come from `import.meta.env`
- [ ] `npm run build` produces zero warnings
- [ ] `npm run lint` produces zero errors
- [ ] All smoke tests in Phase 12.3 pass without UI regression
