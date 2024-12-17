const Users = require('../models/userModel')

const authAdmin = async(req,res,next) => {
    try {
        // Log the user ID from the token
        console.log('User ID from token:', req.user)

        const user = await Users.findOne({
            _id: req.user._id  // Make sure this matches how you're storing the ID in the token
        })

        if(!user) {
            console.log('User not found')
            return res.status(400).json({msg:"User not found"})
        }

        if(user.role !== 1) {
            console.log('User is not an admin. Current role:', user.role)
            return res.status(400).json({msg:"Admin resources access denied"})
        }

        next()
    } catch(err) {
        console.error('Admin auth error:', err)
        return res.status(500).json({msg:err.message})
    }
}

module.exports = authAdmin