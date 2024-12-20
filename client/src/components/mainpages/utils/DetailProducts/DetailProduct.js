import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import { Link } from 'react-router-dom'


const DetailProduct = () => {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [DetailProduct, setDetailProduct] = useState(null)
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)

    useEffect(() => {
        if (params.id && products.length > 0) {
            const foundProduct = products.find(product => product._id === params.id)
            
            if (foundProduct) {
                console.log('Found Product:', foundProduct)
                setDetailProduct(foundProduct)
                // Load rating from localStorage
                const savedRating = localStorage.getItem(`rating-${params.id}`)
                if (savedRating) {
                    setRating(parseInt(savedRating))
                }
            } else {
                console.log('No product found with this ID')
            }
        }
    }, [params.id, products])

    const handleRating = (value) => {
        setRating(value)
        // Save rating to localStorage
        localStorage.setItem(`rating-${params.id}`, value.toString())
    }

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
                    
                    <div className="rating-container">
                        <h3>Rate this item:</h3>
                        <div className="rating">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1
                                return (
                                    <span
                                        key={index}
                                        className={`star ${ratingValue <= (hover || rating) ? 'active' : ''}`}
                                        onClick={() => handleRating(ratingValue)}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    >
                                        ★
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                    <Link to='/cart'>Add to Cart</Link>
                    <p>{DetailProduct.content}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct