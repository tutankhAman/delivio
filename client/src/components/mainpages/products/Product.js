import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/ProductLists/ProductList'

const Product = () => {
  const state = useContext(GlobalState)
  const [products] = state.productAPI.products
  return (
    <div className='products'>
      {
        products.map(products=> {
          return <ProductList key={products.id} product={products} />
        })
      }
      
    </div>
  )
}

export default Product
