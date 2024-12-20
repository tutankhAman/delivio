import React, { useContext } from 'react'
import { GlobalState } from '../../../../GlobalState'
import { Link } from 'react-router-dom'

const BtnRender = ({ product }) => {

    const state = useContext(GlobalState)
  const [products] = state.productAPI.products
  const [isAdmin] = state.userAPI.isAdmin
  const addCart = state.userAPI.addCart

  return (
    <div className='row_btn'>
        {isAdmin ?
          <>
            <Link className='buy_btn' id='btn_buy' to={'#!'}>Delete</Link>
            <Link className='view_btn' id='btn_view' to={`detail/${product._id}`}>Edit</Link>
          </>
          :
          <>
            <Link className='buy_btn' id='btn_buy' to={'#!'} onClick={() => addCart(product)}>
              Buy
            </Link>
            <Link className='view_btn' id='btn_view' to={`detail/${product._id}`}>
              View
            </Link>
          </>
        }
      </div>
  )
}

export default BtnRender
