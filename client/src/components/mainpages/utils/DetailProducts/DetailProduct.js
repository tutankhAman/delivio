import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import { Link } from 'react-router-dom'


const DetailProduct = () => {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [DetailProduct, setDetailProduct] = useState(null)

    useEffect(() => {
        console.log('Params ID:', params.id)
        console.log('All Products:', products)

        if (params.id && products.length > 0) {
            const foundProduct = products.find(product => product._id === params.id)
            
            if (foundProduct) {
                console.log('Found Product:', foundProduct)
                setDetailProduct(foundProduct)
            } else {
                console.log('No product found with this ID')
            }
        }
    }, [params.id, products])

    // Render null or loading state if no product is found
    if (!DetailProduct) {
        return <div>Loading or Product Not Found</div>
    }

    return (
        <div className='detail-container'>
            <div className='details'>
                <img src={DetailProduct.images[0]} alt={DetailProduct.name || 'Product Image'} />
                <div className='details_box'>
                    <h2>{DetailProduct.name || 'Unnamed Product'}</h2>
                    <span>{DetailProduct.price || 'Price Not Available'}</span>
                    <p>{DetailProduct.description || 'No description'}</p>
                    <p>Sold: {DetailProduct.sold}</p>
                    <Link to='/cart'>Add to Cart</Link>
                    <p>{DetailProduct.content}</p>

                </div>
            </div>
        </div>
        
    )
}

export default DetailProduct