import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Edit from './pages/Edit'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskProvider from './context/Taskprovider';
import SignUp from '../src/pages/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-screen h-screen bg-red-500 flex justify-center items-center">
        <div className="bg-white p-8 h-auto w-auto">
          <TaskProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />}></Route >
                <Route path="/signup" element={<SignUp />}></Route >
                <Route path="/home" element={<Home />}></Route >
                <Route path="/edit" element={<Edit />}></Route >
              </Routes>
            </BrowserRouter>
          </TaskProvider>
        </div>
      </div>
    </>
  )
}

export default App



