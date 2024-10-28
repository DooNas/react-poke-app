import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DetailPage from './pages/DetailPage'
import MainPage from './pages/MainPage'

const App = props => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/pokemon/:id' element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

App.propTypes = {}

export default App