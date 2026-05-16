import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tokenStore, AUTH_LOGOUT_EVENT } from '../utils/tokenStore'
import { AuthContext } from './AuthContextValue'

const PROTECTED_ROUTES = ['/profile', '/cart', '/checkout', '/wishlist', '/trackorder']

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [token, setToken] = useState(() => tokenStore.getToken())
  const [user, setUser] = useState(() => tokenStore.getUser())

  const login = useCallback((tokens, userData = null) => {
    tokenStore.setTokens(tokens.token, tokens.refreshToken)
    if (userData) tokenStore.setUser(userData)
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
    () => ({ user, token, isAuthenticated: !!token, login, logout }),
    [user, token, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

