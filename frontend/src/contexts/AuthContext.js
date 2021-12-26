import React, {useContext, useState, useEffect} from 'react'

import { requestAuthToken } from '../services/Api'
import { loadUser, storeUser } from '../services/Storage'

let cryptoJS = require('crypto-js')

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(loadUser())

  useEffect(() => {
    storeUser(currentUser)
  })

  function signup(email, password) {
    // API call to backend
  }

  async function login(email, password) {
    let request = requestAuthToken(email, password)
    let [success, data] = await request
    if (success) {
      let user = {}
      storeUser(user, data)
      setCurrentUser(user)
    }
    return success
  }

  function logout() {
    setCurrentUser(null)
    storeUser(currentUser)
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