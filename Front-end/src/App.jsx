import { useState } from 'react'

import './App.css'
import { Input } from './components/components/ui/input'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Todopage from './pages/Todopage'
import NewTask from './pages/NewTask'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from './components/components/ui/sonner'
import { useSelector } from 'react-redux'
function App() {
  const { user } = useSelector((store) => store.auth)
  
  

  return (
    <div>
      <Routes>
        <Route path="/" element={!user?<Home />:<Todopage />} />
        <Route path="/login" element={!user?<Login />:<Todopage />} />
        <Route path="/signup" element={!user?<Signup />:<Todopage />} />
        <Route path="/todo" element={user?<Todopage />:<Login />} />
        <Route path="/newtask" element={user?<NewTask />:<Login />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App
