import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tokenStore, AUTH_LOGOUT_EVENT } from '../utils/tokenStore'
import { AuthContext } from './AuthContextValue'
import axiosInstance from '../utils/axiosInstance'

const PROTECTED_ROUTES = ['/profile', '/cart', '/checkout', '/wishlist', '/trackorder']

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [token, setToken] = useState(() => tokenStore.getToken())
  const [user, setUser] = useState(() => tokenStore.getUser())
  const [isCheckoutAuthModalOpen, setIsCheckoutAuthModalOpen] = useState(false)

  const openCheckoutAuthModal = useCallback(() => setIsCheckoutAuthModalOpen(true), [])
  const closeCheckoutAuthModal = useCallback(() => setIsCheckoutAuthModalOpen(false), [])

  const login = useCallback(async (tokens, userData = null) => {
    tokenStore.setTokens(tokens.token, tokens.refreshToken)
    if (userData) tokenStore.setUser(userData)

    // Sync guest cart to backend
    try {
      const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]')
      if (guestCart.length > 0) {
        for (const item of guestCart) {
          await axiosInstance.post('/cart', { productId: item.productId, quantity: item.quantity })
        }
        localStorage.removeItem('guest_cart')
      }
    } catch (err) {
      console.error('Failed to sync guest cart to backend', err)
    }

    // Sync guest wishlist to backend
    try {
      const guestWishlist = JSON.parse(localStorage.getItem('guest_wishlist') || '[]')
      if (guestWishlist.length > 0) {
        for (const item of guestWishlist) {
          await axiosInstance.post('/wishlist', { productId: item.productId })
        }
        localStorage.removeItem('guest_wishlist')
      }
    } catch (err) {
      console.error('Failed to sync guest wishlist to backend', err)
    }

    setToken(tokens.token)
    setUser(userData)
  }, [])


  const logout = useCallback(() => {
    tokenStore.clear()
    setToken(null)
    setUser(null)
  }, [])

  useEffect(() => {
    const onForceLogout = () => {
      logout()
      const isProtected = PROTECTED_ROUTES.some((r) =>
        window.location.pathname.startsWith(r),
      )
      if (isProtected) navigate('/login')
    }
    window.addEventListener(AUTH_LOGOUT_EVENT, onForceLogout)
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, onForceLogout)
  }, [logout, navigate])

  const value = useMemo(
    () => ({ 
      user, 
      token, 
      isAuthenticated: !!token, 
      login, 
      logout,
      isCheckoutAuthModalOpen,
      openCheckoutAuthModal,
      closeCheckoutAuthModal
    }),
    [user, token, login, logout, isCheckoutAuthModalOpen, openCheckoutAuthModal, closeCheckoutAuthModal],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

