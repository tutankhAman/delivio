import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import PaymentPopup from './PaymentPopup'
import './Cart.css'

const Cart = () => {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [showPayment, setShowPayment] = useState(false)
  let orderCount = 1;

  const incrementQuantity = (product) => {
    const updatedCart = cart.map(item => 
      item._id === product._id 
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    )
    setCart(updatedCart)
  }

  const decrementQuantity = (product) => {
    const updatedCart = cart.map(item => 
      item._id === product._id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    setCart(updatedCart)
  }

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)
  }

  const calculateTax = (subtotal) => subtotal * 0.04
  const calculateDiscount = (subtotal) => subtotal * 0.02
  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const tax = calculateTax(subtotal)
    const discount = calculateDiscount(subtotal)
    return subtotal + tax - discount
  }

  const handleConfirmOrder = () => {
    setShowPayment(true)
  }

  const handleClosePayment = () => {
    setShowPayment(false)
  }

  const handlePaymentComplete = () => {
    setCart([]) // Reset the cart
    orderCount++ // Increment order count
    alert(`Order #${orderCount} completed successfully!`)
  }

  if (cart.length === 0)
    return <h2 style={{ textAlign: "center", fontSize: "3rem", margin: "5rem 5rem" }}>Cart is empty, Please add some products to cart</h2>

  return (
    <>
      <div className='cart-page-container'>
        <div className='cart-items-container'>
          {cart.map(product => (
            <div className='cart-item' key={product._id}>
              <img src={product.images[0]} alt={product.name || 'Product Image'} />
              <div className='item-details'>
                <h3>{product.name || 'Unnamed Product'}</h3>
                <p>Rs. {product.price || 'Price Not Available'}</p>
                <div className='quantity-controls'>
                  <button onClick={() => decrementQuantity(product)}>-</button>
                  <span>{product.quantity || 1}</span>
                  <button onClick={() => incrementQuantity(product)}>+</button>
                </div>
                <Link to='/cart' className='remove-btn'>Remove</Link>
              </div>
            </div>
          ))}
        </div>

        <div className='invoice-container'>
          <h2>Order Summary</h2>
          <div className='invoice-details'>
            <div className='invoice-row'>
              <span>Subtotal:</span>
              <span>Rs. {calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className='invoice-row'>
              <span>Tax (4%):</span>
              <span>Rs. {calculateTax(calculateSubtotal()).toFixed(2)}</span>
            </div>
            <div className='invoice-row'>
              <span>Discount (2%):</span>
              <span>Rs. {calculateDiscount(calculateSubtotal()).toFixed(2)}</span>
            </div>
            <div className='invoice-row total'>
              <span>Total:</span>
              <span>Rs. {calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          <button className='confirm-order-btn' onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </div>
      </div>
      {showPayment && (
        <PaymentPopup 
          amount={calculateTotal()} 
          onClose={handleClosePayment}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </>
  )
}

export default Cart
