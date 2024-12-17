const Product = require("../models/productModel")
const Restaurant = require("../models/restaurantModel")

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const { restaurantId } = req.query
            let query = {}

            if (restaurantId) {
                query.restaurant = restaurantId
            }

            const products = await Product.find(query)
                .populate('category', 'name')
                .populate('restaurant', 'name')
            
            res.json(products)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { name, description, price, category, restaurant, images } = req.body;

            // Verify restaurant exists
            const restaurantExists = await Restaurant.findById(restaurant)
            if (!restaurantExists) {
                return res.status(400).json({ msg: "Restaurant does not exist" })
            }

            // Create the product
            const newProduct = new Product({ 
                name, 
                description, 
                price, 
                category, 
                restaurant, 
                images 
            })

            await newProduct.save()

            // Add product to restaurant's product list
            await Restaurant.findByIdAndUpdate(
                restaurant, 
                { $push: { products: newProduct._id } },
                { new: true }
            )

            res.json({ 
                msg: "Created a Product", 
                product: newProduct 
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id)

            if (!product) {
                return res.status(404).json({ msg: "Product not found" })
            }

            // Remove product reference from the associated restaurant
            await Restaurant.findByIdAndUpdate(
                product.restaurant, 
                { $pull: { products: product._id } }
            )

            res.json({ msg: "Deleted a product" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { name, description, price, category, restaurant, images } = req.body;

            // Find the existing product
            const existingProduct = await Product.findById(req.params.id)
            if (!existingProduct) {
                return res.status(404).json({ msg: "Product not found" })
            }

            // Update product details
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id, 
                { name, description, price, category, restaurant, images },
                { new: true }
            )

            // If restaurant is changed, update product in the new restaurant
            if (restaurant && restaurant !== existingProduct.restaurant.toString()) {
                await Restaurant.findByIdAndUpdate(
                    existingProduct.restaurant, 
                    { $pull: { products: existingProduct._id } }
                )
                await Restaurant.findByIdAndUpdate(
                    restaurant, 
                    { $push: { products: existingProduct._id } }
                )
            }

            res.json({ 
                msg: "Updated Product", 
                product: updatedProduct 
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = productCtrl
