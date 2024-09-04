import React from 'react'
import "./About.css"
import about from "../../assets/about.webp"
const About = () => {
  return (
    // <div className="about">
    //     <div className="about-content">
    //         <h2>About Us</h2>
    //         <p>We are dedicated to providing high quality online courses to help individuals learn and grow in their desired fields. Our experienced instruction ensure that each course is tailored for effective learning and practical application</p>
    //     </div>
    // </div>
    <div className="container">
    <div className="about-container">
      <div className="about-text">
         <div className="about-content">
             <h2>About Us</h2>
             <p>We are committed to offering top-tier online courses designed to empower learners with the knowledge and skills needed to excel in their chosen fields. Our platform features a diverse range of subjects, each curated by industry experts who are passionate about teaching. We prioritize practical application alongside theoretical understanding, ensuring that our students are well-prepared to face real-world challenges. Whether you are looking to advance your career, switch fields, or simply learn something new, we have a course that will meet your needs. Join our community of learners today and start your journey towards success.</p>
        </div>
      </div>
      <div className="about-img">
        <img src={about} alt="" />
      </div>
    </div>
    </div>
  )
}

export default About