import { useState } from 'react'
import {BrowserRouter, Routes, Route ,useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Upload from './pages/Upload'

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/upload" element={<Upload/>} />
          </Routes>
        </BrowserRouter>      
    </>
  )
}

export default App
