import React from 'react'
import {Link} from 'react-router-dom'

const ProductList = ({ product }) => {
  console.log(product)

  return (
    <div className='product_card'>
      <img src={product.images[0]} alt={product.name} />

      <div className='product_box'>
        <h2 title={product.name}>{product.name}</h2>
        <span>{product.price}</span>
        <p>{product.description}</p>
      </div>

      <div className='row_btn'>
        <Link className='buy_btn' id='#btn_buy'to={'#!'}>Buy</Link>
        <Link className='view_btn' id='#btn_view'to={`detail/${product._id}`}>View</Link>
      </div>
    </div>
  )
}

export default ProductList
