import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/ProductLists/ProductList'
import './Product.css'

const Product = () => {
  const state = useContext(GlobalState)
  const [products] = state.productAPI.products
  const [isAdmin] = state.userAPI.isAdmin
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    './images/car-1.png', 
    './images/car-2.png', 
    './images/car-3.png'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // 5 seconds per image

    return () => clearInterval(interval)
  }, [images.length])

  const getImageClassName = (index) => {
    if (index === currentIndex) return 'carousel-image current'
    if (index === (currentIndex + 1) % images.length) return 'carousel-image next'
    if (index === (currentIndex - 1 + images.length) % images.length) return 'carousel-image previous'
    return 'carousel-image hidden'
  }

  return (
    <div className="main-container">
      <div className='carousel'>
        {images.map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt={`Carousel ${index}`} 
            className={getImageClassName(index)}
          />
        ))}
      </div>
      <div className='products'>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductList key={product._id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  )
}

export default Product