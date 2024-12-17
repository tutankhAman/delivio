import React from 'react'
import Product from './products/Product'
import Login from './login/Login'
import Register from './login/Register'
import Cart from './cart/Cart'
import HomePage from './home/HomePage'
import restaurantCatalogue from './restaurants/restaurantCatalogue'
import {Route, Routes} from 'react-router-dom'

const Pages = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/products' element={<Product/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/catalogue' element={<restaurantCatalogue/>}/>
    </Routes>
  )
}

export default Pages
