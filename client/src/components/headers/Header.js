import React, { useState } from 'react'
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from 'react-router-dom'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className='logo'>
        <h1>
          <Link to='/'><img src='/images/logo.svg' alt="Logo"></img></Link>
        </h1>
      </div>

      <div className='menu-icon' onClick={toggleMenu}>
        {menuOpen ? <IoCloseOutline size={30} /> : <FiMenu size={30} />}
      </div>

      <ul className={`nav-buttons ${menuOpen ? 'open' : ''}`}>
        <li><Link to='/' className='nav-link'>Catalogue</Link></li>
        <li><Link to='/' className='nav-link'>About Us</Link></li>
        <li><Link to='/' className='nav-link'>Contact Us</Link></li>
      </ul>

      <ul className='functionality'>
        <input
          type="text"
          placeholder="Search..."
        />      
        <div className='cart-icon'>
          <span>0</span>
          <Link to='/cart'><FiShoppingCart /></Link>
        </div>
        <button className='login-button'>
          <Link to='/login'>SignUp</Link>
        </button>
      </ul>
    </header>
  )
}

export default Header