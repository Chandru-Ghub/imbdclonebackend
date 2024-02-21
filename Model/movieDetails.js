const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    director:{
        required:true,
        type:String
    },
    actors:{
        required:true,
        type:String
    },
    type:{
        required:true,
        type:String
    },
    imdbID:{
        required:true,
        type:String
    },
    imdbRating:{
        required:true,
        type:String
    },
    language:{
        required:true,
        type:String
    },
    released:{
        required:true,
        type:String
    },
    runtime:{
        required:true,
        type:String
    },
    genre:{
        required:true,
        type:String
    },
    trailer:{
        required:true,
        type:String
    },
    cardImg:{
        required:true,
        type:String
    },
    images:{
        required:true,
        type:Array
    }
})

module.exports = mongoose.model('movieDetails',movieSchema)