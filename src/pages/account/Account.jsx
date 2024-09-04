import React from 'react'
import "./Account.css"
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import { UserData } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Account = ({user}) => {
    const {setIsAuth,setUser}=UserData();
    const navigate=useNavigate();
    const logoutHandler=()=>{
        setIsAuth(false);
        setUser([]);
        localStorage.clear();
        toast.success("Logged out successfully");
        navigate("/login");
    }
  return (
    <div>
        <div className="profile">
            <h2>My Profile</h2>
            <div className="profile-info">
                <p>
                    <strong>Name: {user.name}</strong>

                </p>
                <p>
                    <strong>Email : {user.email}</strong>
                </p>
                <button onClick={()=>navigate(`/${user._id}/dashboard`)} className="common-btn"><MdOutlineDashboard/>Dashboard</button>
                
                <button className="common-btn"
                 style={{backgroundColor:"red",marginLeft:"4px"}}
                 onClick={logoutHandler}>
                    <MdLogout/>Logout
                </button>
                <br />
                {
                    user && user.role==="admin" && <button onClick={()=>navigate(`/admin/dashboard`)} className="common-btn"><MdOutlineDashboard/>Admin Dashboard</button>
                }
            </div>

        </div>
    </div>
  )
}

export default Account