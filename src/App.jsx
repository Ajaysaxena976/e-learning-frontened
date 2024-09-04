import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import "./App.css"
import Header from './components/header/Header'
import Home from './pages/Home/Home'
import Footer from './components/footer/Footer'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Verify from './pages/auth/Verify'
import About from './pages/About/About'
import Account from './pages/account/Account'
import { UserData } from './Context/UserContext'
import Loading from './components/Loading/Loading'
import {ClockLoader} from "react-spinners"
import Courses from './pages/courses/Courses'
import CourseDescription from './pages/CourseDescription/CourseDescription'
import PaymentSuccess from './pages/paymentSuccess/PaymentSuccess'
import Dashboard from './pages/Dashboard/Dashboard'
import CourseStudy from './pages/CourseStudy/CourseStudy'
import Lecture from './pages/Lectures/Lecture'
import AdminDashboard from './pages/Dashboard/AdminDashboard'
import AdminCourses from './admin/Courses/AdminCourses'
import AdminUsers from './admin/Users/AdminUsers'
const App = () => {
  const {isAuth,user,loading} =UserData();
  return (
    <>
      {
        loading?<Loading/>:(
          
    <BrowserRouter>
    <Header isAuth={isAuth}/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={isAuth?<Home/>:<Login/>}/>
        <Route path="/register" element={isAuth?<Home/>:<Register/>}/>
        <Route path="/verify" element={isAuth?<Home/>:<Verify/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/account" element={<Account user={user}/>}/>
        <Route path="/course" element={<Courses/>}/>
        <Route path="/course/:id" element={isAuth?<CourseDescription user={user}/>:<Login/>}/>
        <Route
              path="/payment-success/:id"
              element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
            />
        <Route path="/admin/dashboard" element={isAuth?<AdminDashboard user={user}/>:<Login/>}/>
        <Route path="/admin/course" element={isAuth?<AdminCourses user={user}/>:<Login/>}/>
        <Route path="/admin/users" element={isAuth?<AdminUsers user={user}/>:<Login/>}/>
        <Route path="/:id/dashboard" element={isAuth?<Dashboard user={user}/>:<Login/>}/>
        <Route path="/course/study/:id" element={isAuth?<CourseStudy user={user}/>:<Login/>}/>
        <Route path="/lectures/:id" element={isAuth?<Lecture user={user}/>:<Login/>}/>
    </Routes>
    <Footer/>
</BrowserRouter>
        )
      }
    </>
  )
}

export default App;