import React from 'react'
import {Route, Routes, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile"

import { AuthProvider } from './contexts/AuthContext'

function App() {
  var loggedIn = false;

  return (
    <div className="App">
      <AuthProvider>
      <header className="App-header">
        <NavigationBar />
      </header>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        {loggedIn ?
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
          : <Route path="/" element={<Navigate replace to="/login" />} />
        }
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App