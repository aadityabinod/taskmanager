import React from 'react'
import Header from "./Components/Header/Header"
import 'font-awesome/css/font-awesome.min.css';
import MiniSidebar from './Components/MiniSidebar/MiniSidebar';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import LoginPage from './completed/LoginPage';
import RegisterPage from './completed/RegisterPage';

function App() {
  return (
    <div>
      
       
      <Header/>
      <MiniSidebar/>
      

      <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />

      </Routes>
      
     
    </div>
  )
}

export default App