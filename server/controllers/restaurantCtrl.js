const Restaurant = require("../models/restaurantModel")

const restaurantCtrl = {
    getRestaurants: async (req, res) => {
        try {
            const restaurants = await Restaurant.find().populate('products')
            res.json(restaurants)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createRestaurant: async (req, res) => {
        try {
            const { name, address, phone, type } = req.body;
            
            if (!name || !address || !phone || !type) {
                return res.status(400).json({ msg: "Please provide all required fields" })
            }

            const restaurant = await Restaurant.findOne({ name })
            if (restaurant) return res.status(400).json({ msg: "Restaurant already exists" })

            const newRestaurant = new Restaurant({ name, address, phone, type })
            await newRestaurant.save()

            res.status(201).json({ msg: "Created a Restaurant", restaurant: newRestaurant })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteRestaurant: async (req, res) => {
        try {
            const restaurant = await Restaurant.findByIdAndDelete(req.params.id)
            
            if (!restaurant) {
                return res.status(404).json({ msg: "Restaurant not found" })
            }

            res.json({ msg: "Deleted a restaurant", deletedRestaurant: restaurant })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateRestaurant: async (req, res) => {
        try {
            const { name, address, phone, type } = req.body;

            if (!name && !address && !phone && !type) {
                return res.status(400).json({ msg: "Please provide at least one field to update" })
            }

            const updatedRestaurant = await Restaurant.findByIdAndUpdate(
                req.params.id, 
                { name, address, phone, type }, 
                { new: true }
            )

            res.json({ msg: "Updated Restaurant", restaurant: updatedRestaurant })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getRestaurantById: async (req, res) => {
        try {
            const restaurant = await Restaurant.findById(req.params.id).populate('products')

            if (!restaurant) {
                return res.status(404).json({ msg: "Restaurant not found" })
            }

            res.json(restaurant)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = restaurantCtrl
