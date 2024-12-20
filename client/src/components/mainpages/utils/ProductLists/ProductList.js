import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import BtnRender from './BtnRender'


const ProductList = ({ product, isAdmin }) => {

  

  const handleCheckboxChange = (e) => {
    // Handle checkbox change logic here
  }

  return (
    <div className='product_card'>
      {
        isAdmin && <input type='checkbox' checked={product.checked} onChange={handleCheckboxChange} />
      }

      <img src={product.images[0]} alt={product.name} />

      <div className='product_box'>
        <h2 title={product.name}>{product.name}</h2>
        <span>{product.price}</span>
        <p>{product.description}</p>
      </div>

      <BtnRender product={product}/>
    </div>
  )
}

export default ProductList
