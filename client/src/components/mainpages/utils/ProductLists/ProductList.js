import React from 'react'
 

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
    </div>
  )
}

export default ProductList
