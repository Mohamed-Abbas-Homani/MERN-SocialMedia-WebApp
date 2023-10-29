import React from 'react'
import {BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom"
import HomePage from "scenes/homePage"
import LoginPage from 'scenes/loginPage'
import ProfilePage from 'scenes/profilePage'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'
import { themeSettings } from 'theme'


const App = () => {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector(state => state.token))

  return (
    <div className='app'>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route exact path='/' element={<LoginPage/>}/>
            <Route exact path='/home' element={isAuth? <HomePage/>: <Navigate to="/"/>}/>
            <Route path='/profile/:userId' element={isAuth? <ProfilePage/>: <Navigate to="/"/>}/>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App