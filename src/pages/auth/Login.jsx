import React, { useState } from 'react'
import "./Auth.css"
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../Context/UserContext'
import { CourseData } from '../../Context/CourseContext'

const Login = () => {
  const {btnLoading,loginUser}=UserData();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const {fetchMyCourse}=CourseData();
  const submitHandler=async(e)=>{
    // to prevent reload
    e.preventDefault();
    await loginUser(email,password,navigate,fetchMyCourse);
  }
  return (
    <div className="auth-page">
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="email">Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}required />

                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                {/* If the btnLoading is true then button will be disabled  */}
                <button disabled={btnLoading} type="submit" className="common-btn">
                  {btnLoading?"Please Wait":"Login"}
                </button>
            </form>
            <p>
                Don't have an account ? <Link to={"/register"}>Register</Link>
            </p>
        </div>
    </div>
  )
}

export default Login