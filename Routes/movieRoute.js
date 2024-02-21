const router = require('express').Router()
const { newMovies, updateMovie, getAllMovies, getmovie, deleteMovie } = require('../Controller/movieController')
const { verifyTokenAndAdmin, verifyToken } = require('../JWT/jwtVerification')

// Post router for add movie details
router.post('/addmovies',verifyTokenAndAdmin,newMovies)

//  Update movie details
router.put('/updatemovie/:id',verifyTokenAndAdmin,updateMovie)

// get all movie data
router.get('/movies',verifyToken,getAllMovies)

// get movie by id
router.get('/getmovie/:id',verifyToken,getmovie)

// delete movie details
router.delete('/deletemovie/:id',verifyTokenAndAdmin,deleteMovie)

module.exports = router
