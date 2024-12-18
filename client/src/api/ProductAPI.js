import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ProductAPI = () => {
  const [products, setProducts] = useState([]) 

  const getProducts = async () => {
    try {
      const res = await axios.get('/api/products')
      console.log('API Response:', res.data) 
      setProducts(res.data) 
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  useEffect(() => {
    getProducts() 
  }, []) 

  return {
    products: [products, setProducts], 
  }
}

export default ProductAPI
