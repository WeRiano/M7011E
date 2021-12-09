import React, {useEffect} from 'react'

import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth()

  useEffect(() => {

  }, [currentUser])

  return (currentUser != null ? children: <Navigate to="/login"/>)
}