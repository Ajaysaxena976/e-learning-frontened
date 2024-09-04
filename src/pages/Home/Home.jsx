import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Home.css"
import Testimonial from '../../components/Testimonials/Testimonial';
const Home = () => {
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate("/course");
  }
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Welcome to our E-learning Platform</h1>
          <p>Learn, Grow, Excel</p>
          <button className="common-btn" onClick={handleClick}>Get Started</button>
        </div>
      </div>
      <Testimonial/>
    </div>
  )
}

export default Home