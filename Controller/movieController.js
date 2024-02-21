const movieDetails = require("../Model/movieDetails")

// add new movie details
const newMovies = async(req,res)=>{

    const {title,director} = req.body
    const check = await movieDetails.findOne({title})
    if(check) return res.status(401).send('Movie already existed!')
    try{
        const movie = new movieDetails(req.body)
        await movie.save()
        res.status(201).json(movie)
    }
    catch(err){
        res.status(400).json(err.message)
        console.log(err.message)
    }
}

// update movie details
const updateMovie = async(req,res)=>{
    const id = req.params.id
    try{
        const data = await movieDetails.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json(data)
    }catch(err){
        res.status(400).json(err.message)
        console.log(err.message)
    }
}

// get movie by ID
const getmovie = async(req,res)=>{
    const id = req.params.id
    try{
        const getData = await movieDetails.findById({_id:id})
        console.log(getData)
        res.status(201).json(getData)
    }catch(err){
        res.status(400).json(err.message)
        console.log(err)
    }
}

// delete movie data by ID
const deleteMovie = async(req,res)=>{
    const id = req.params.id
    try{
        const delData = await movieDetails.findByIdAndDelete(id)
        res.status(201).send('Movie details has been deleted!!')
    }
    catch(err){
        res.status(400).json(err.message)
        console.log(err.message)
    }
}

// get all movie details
const getAllMovies = async(req,res)=>{

    try{
        const allData = await movieDetails.find()
        console.log(allData)
        res.status(201).json(allData)
    }catch(err){
        res.status(400).json(err.message)
    }
} 
module.exports = {newMovies,updateMovie,getmovie,getAllMovies,deleteMovie}