const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./Database/configueDB')
dotenv.config()
const port = process.env.PORT
const app = express()
const movieRouter = require('./Routes/movieRoute')
const authRouter = require('./Routes/authRoute')
// middlewares
app.use(cors())
app.use(express.json())

app.use('/api',movieRouter)
app.use('/api',authRouter)
// DataBase connected
connectDB()

app.get('/',(req,res)=>{
    res.send('IMDB clone project API')
})


// Express Server running PORT
app.listen(port,(err)=>{
    if(err) return console.log(err,'>>>>')
    console.log('Server running on port ',port)
})