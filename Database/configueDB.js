const mongooose =require('mongoose')
const dotenv = require('dotenv').config()
const url = process.env.MONGO_URL
 const connectDB = async()=>{
    try {
            const connection = await mongooose.connect(url)
            console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
       
}

module.exports = connectDB