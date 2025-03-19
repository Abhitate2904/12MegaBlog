import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet,useLocation } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const location = useLocation();
    const hideHeaderFooter =location.pathname === '/' || location.pathname.includes('/test/') || location.pathname.includes('/login') || location.pathname.includes('/signup');

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className="min-vh-100 d-flex flex-column bg-light border border-secondary">
    <div className="w-100">
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow-1">
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  </div>
  
  
  ) : null
}

export default App
