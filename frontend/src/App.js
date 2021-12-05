import React from 'react'
import {Route, Routes, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from "./components/Dashboard";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavigationBar />
        </header>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {this.state.loggedIn ?
              <Route path="/" element={<Navigate replace to="/dashboard" />} />
            : <Route path="/" element={<Navigate replace to="/login" />} />
          }
        </Routes>
      </div>
    );
  }
}

export default App