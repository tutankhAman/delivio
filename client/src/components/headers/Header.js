import React, { useContext, useState, useRef, useEffect } from 'react'
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import { TbTrophyFilled } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI ? state.userAPI.isLogged : [false, () => {}];
  const [isAdmin, setIsAdmin] = state.userAPI ? state.userAPI.isAdmin : [false, () => {}];
  const [cart] = state.userAPI.cart;
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = state.productAPI.search;
  const [products] = state.productAPI.products;
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleProductClick = () => {
    setShowDropdown(false);
    setSearchTerm('');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logoutUser = async () => {
    await axios.get('/user/logout');
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
  };

  const adminRouter = () => {
    return (
      <>
        <li><Link to='/create_product'>Create Product</Link></li>
        <li><Link to='/category'>Categories</Link></li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to='/' onClick={logoutUser} className="logout-button">
            <FiLogOut /> Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className='logo'>
        <h1>
          <Link to='/'>{isAdmin ? 'Admin Dashboard' : <img src='/images/logo.svg' alt="Logo"></img>}</Link>
        </h1>
      </div>

      <div className='menu-icon' onClick={toggleMenu}>
        {menuOpen ? <IoCloseOutline size={30} /> : <FiMenu size={30} />}
      </div>

      <ul className={`nav-buttons ${menuOpen ? 'open' : ''}`}>
        <li><Link to='/' className='nav-link'>{isAdmin ? 'Products' : 'Catalogue'}</Link></li>
        <li><Link to='/about' className='nav-link'>About Us</Link></li>
        <li><Link to='/contact' className='nav-link'>Contact Us</Link></li>
        <li><Link to='/achievements' className='nav-link'><TbTrophyFilled /></Link></li>
      </ul>

      <ul className='functionality'>
        <div className="search-container" ref={searchRef}>
          <input
            className='search-bar'
            type="text"
            placeholder="Search products..."
            onChange={handleSearch}
            value={searchTerm}
          />
          {showDropdown && searchTerm && (
            <div className="search-dropdown" ref={dropdownRef}>
              {products.length > 0 ? (
                products.map(product => (
                  <Link 
                    to={`/detail/${product._id}`} 
                    key={product._id}
                    className="search-item"
                    onClick={handleProductClick}
                  >
                    <img src={product.images[0]} alt={product.name} />
                    <div className="search-item-details">
                      <h4>{product.name}</h4>
                      <span>Rs. {product.price}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="no-results">No products found</div>
              )}
            </div>
          )}
        </div>
        {
          isAdmin ? '' : <div className='cart-icon'>
            <span>{cart.length}</span>
            <Link to='/cart'><FiShoppingCart /></Link>
          </div>
        }
        
        {isAdmin && adminRouter()}{
          isLogged ? loggedRouter() : <button className='login-button'>
            <Link to='/login'>SignUp</Link>
          </button>
        }
      </ul>
    </header>
  );
}

export default Header;