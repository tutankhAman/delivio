const category = require("../models/categoryModels")

const categoryCtrl = {
    getCategories : async(req,res) => {
        try{
            const categories = await category.find()
            res.json(categories)
        } catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    createCategory: async(req,res) => {
        try{
            const{name} = req.body;
            const category = await Category.findOne({name})

            if(category) return res.status(400).json({msg:"Category Already exists"})
// 17:00
            res.json('Check Admin Success')
        } catch(err) {
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports= categoryCtrl