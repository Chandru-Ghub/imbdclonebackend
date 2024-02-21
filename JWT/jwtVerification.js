const jwt = require('jsonwebtoken')

// AUTHENTICATION
// verify the authenticated user
const verifyToken = (req,res,next)=>{
    const accessToken = req.headers.token

    if(accessToken){
        const token = accessToken.split(' ')[1]
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err) return res.status(403).send('invalid token')
            req.user = user
            next()
        })
    }
    else{
        res.status(401).send('You are not authenticated!!')
    }
}

// AUTHORIZATION
// verify if the user is Admin or not
const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin) next()
        else{
            res.status(403).send('You are not allowed to do that!')
    }
    })
}

module.exports = {verifyToken,verifyTokenAndAdmin}