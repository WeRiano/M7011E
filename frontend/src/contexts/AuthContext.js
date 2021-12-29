import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { requestCreateAuthToken, requestDestroyAuthToken, requestCreateUser } from '../services/Api'
import { loadUser, storeUser, loadToken } from '../services/Storage'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(loadUser())

  const navigate = useNavigate();

  useEffect(() => {
    storeUser(currentUser)
  })

  async function signup(user) {
    let request = requestCreateUser(user)
    const [success, data] = await request
    return success
  }

  async function login(email, password) {
    let request = requestCreateAuthToken(email, password)
    let [success, data] = await request
    if (success) {
      let user = {}
      storeUser(user, data)
      setCurrentUser(user)
    }
    return success
  }

  async function logout() {
    let token = loadToken()
    if (token == null) {
      setCurrentUser(null)
      storeUser(currentUser)
      return true
    }
    let request = requestDestroyAuthToken(token)
    const [success, data] = await request
    if (success) {
      setCurrentUser(null)
      storeUser(currentUser)
    }
    return success
  }

  const value = {
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}