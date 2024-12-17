const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser')

const app = express();

// Add this line to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({ msg: 'example' })
})

app.listen(PORT, () => {
    console.log("server is running");
})

//Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/restaurantRouter'))
app.use('/api', require('./routes/productRouter'))

// connecting mongoDB

const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected")
}).catch(err => {
    console.log(err)
})