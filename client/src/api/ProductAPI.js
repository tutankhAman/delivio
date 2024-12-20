import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ProductAPI = () => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  const getProducts = async () => {
    try {
      const res = await axios.get('/api/products')
      console.log('API Response:', res.data)
      setProducts(res.data)
      setFilteredProducts(res.data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredProducts(results)
    } else {
      setFilteredProducts(products)
    }
  }, [searchTerm, products])

  return {
    products: [filteredProducts, setProducts],
    search: [searchTerm, setSearchTerm]
  }
}

export default ProductAPI
