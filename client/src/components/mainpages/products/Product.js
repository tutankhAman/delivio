import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/ProductLists/ProductList'

const Product = () => {
  const state = useContext(GlobalState)
  const [products] = state.productAPI.products

  
  // console.log(state)
  return (
    <div className='products'>
      {
        products.length > 0 ? (
          products.map((product) => {
            return <ProductList key={product._id} product={product} />
          })
        ) : (
          <p>No products available</p>
        )
      }
    </div>
  )
}

export default Product
