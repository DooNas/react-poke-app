import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DetailPage from './pages/DetailPage'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='login' element={<LoginPage/>} />
        <Route path='/pokemon/:id' element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

App.propTypes = {}

export default App