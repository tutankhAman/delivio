import React, { useState, useEffect } from 'react'

const PaymentPopup = ({ amount, onClose, onPaymentComplete }) => {
  const [timeLeft, setTimeLeft] = useState(120)

  useEffect(() => {
    if (timeLeft === 0) {
      onClose()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onClose])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleDone = () => {
    onPaymentComplete()
    onClose()
  }

  return (
    <div className="payment-popup-overlay">
      <div className="payment-popup">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Scan QR to Pay</h2>
        <div className="qr-container">
          <img src="/images/qr.jpg" alt="Payment QR Code" />
        </div>
        <div className="payment-details">
          <p className="amount">Amount Payable: Rs. {amount.toFixed(2)}</p>
          <p className="timer">Time Remaining: {formatTime(timeLeft)}</p>
        </div>
        <button className="done-btn" onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  )
}

export default PaymentPopup 