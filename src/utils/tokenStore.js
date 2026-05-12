export const AUTH_LOGOUT_EVENT = 'auth:logout'

const KEYS = {
  token: 'token',
  refreshToken: 'refreshToken',
  user: 'user',
}

export const tokenStore = {
  getToken: () => localStorage.getItem(KEYS.token),

  getRefreshToken: () => localStorage.getItem(KEYS.refreshToken),

  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem(KEYS.user))
    } catch {
      return null
    }
  },

  setTokens: (token, refreshToken) => {
    if (token) localStorage.setItem(KEYS.token, token)
    if (refreshToken) localStorage.setItem(KEYS.refreshToken, refreshToken)
  },

  setUser: (user) => {
    localStorage.setItem(KEYS.user, JSON.stringify(user))
  },

  clear: () => {
    Object.values(KEYS).forEach((key) => localStorage.removeItem(key))
  },
}
