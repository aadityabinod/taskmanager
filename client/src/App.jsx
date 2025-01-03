import React from 'react'
import Header from "./Components/Header/Header"
import 'font-awesome/css/font-awesome.min.css';
import MiniSidebar from './Components/MiniSidebar/MiniSidebar';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import LoginPage from './completed/LoginPage';
import RegisterPage from './completed/RegisterPage';
import OverDuePages from './completed/OverDuePages';
import Home from './completed/AllTasksPages';
import CompletedPage from './completed/CompletedPage';
import PendingPages from './completed/PendingPages';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <div>
      
       
      <Header/>
      <MiniSidebar/>
      <Profile/>

      <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/overdue" element={<OverDuePages/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/completed" element={<CompletedPage/>} />
      <Route path="/pending" element={<PendingPages/>} />



      </Routes>
      
     
    </div>
  )
}

export default App