const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        
        if(!token) {
            console.log('No token provided')
            return res.status(400).json({msg:"No token provided. Please log in."})
        }
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                console.log('Token verification error:', err)
                return res.status(400).json({msg:"Invalid or expired token"})
            }
            
            // Add more logging to understand what's in the token
            console.log('Decoded user:', user)
            req.user = user
            next()
        })
    } catch(err) {
        console.error('Auth middleware error:', err)
        return res.status(500).json({msg:err.message})
    }
}

module.exports = auth