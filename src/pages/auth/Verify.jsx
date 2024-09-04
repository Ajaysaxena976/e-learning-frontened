import React, { useState } from 'react'
import "./Auth.css"
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../Context/UserContext'
const Verify = () => {
  const {btnLoading,verifyOtp}=UserData();
  const [otp,setOtp]=useState("");
  const navigate=useNavigate();
  const submitHandler=async(e)=>{
      e.preventDefault();
      // console.log(otp);
      await verifyOtp(Number(otp),navigate);
      
  }
  return (
    <div className="auth-page">
        <div className="auth-form">
            <h2>Verify Account</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="otp">Otp</label>
                <input type="number" value={otp} onChange={(e)=>setOtp(e.target.value)} required />
                <button disabled={btnLoading} type='submit' className="common-btn">
                  {btnLoading?"Loading":"Verify"}
                </button>

            </form>
            <p>
                Go to <Link to={"/login"}>Login Page</Link>
            </p>
        </div>
    </div>
  )
}

export default Verify