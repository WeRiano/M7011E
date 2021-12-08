import React, {useContext, useState, useRef, useEffect} from 'react'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  })

  function signup(email, password) {
    // API call to backend
  }

  function login(email, password) {
    // API call to backend, use password
    // if success, set user to the user defined by the email ...
    // if false, set user to null
    var user = {
      name: "William",
      email: email
      // other information fetched from database
    }
    setCurrentUser(user)

    return 0
  }

  function logout() {
    setCurrentUser(null)
  }

  const value = {
    currentUser,
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