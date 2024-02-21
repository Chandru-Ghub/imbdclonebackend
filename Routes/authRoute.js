const { signUp, signIn, deleteUser, getAllUser, getUserById } = require('../Controller/authController')
const { verifyTokenAndAdmin } = require('../JWT/jwtVerification')

const router = require('express').Router()

// signUp or register user
router.post('/signup',signUp)

// Signin or login user
router.post('/signin',signIn)

// get all user
router.get('/getuser',getAllUser)

// getuser by ID
router.get('/getuser/:id',getUserById)

//  delete user
router.delete('/deleteuser/:id',verifyTokenAndAdmin,deleteUser)
module.exports = router