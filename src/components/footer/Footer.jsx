import React from 'react'
import "./Footer.css"
import { FaGithub, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { BiLogoGmail } from "react-icons/bi";
const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy;2024 Your E-Learning Platform. All Rights Reserved. <br />
          Made with ❤️ <a href="">Mayank Saxena</a>
        </p>
        <div className="social-links">
          <a href="https://www.instagram.com/mayanksaxena2214"><FaInstagramSquare /></a>
          <a href="https://github.com/MayankSaxena2214"><FaGithub/></a>
          <a href="https://www.linkedin.com/in/mayank-saxena-419388239/"><FaLinkedin/></a>
          <a href="https://leetcode.com/u/Mayanksaxena2114/"><SiLeetcode/></a>
          <a href="mailto:mayanksaxena2214@gmail.com"><BiLogoGmail/></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer