const authDetails = require("../Model/authDetails")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET
const signUp = async(req,res)=>{
    const {email,username,password} = req.body;
    try{
        
        // check username already existed
        const user = await authDetails.findOne({username})
        if(user) return res.status(401).json('UserName already existed!')
        
        // check email already existed
        const mail = await authDetails.findOne({email})
        if(mail) return res.status(401).json('emailID already existed!')
        const hashPass = await bcrypt.hash(password,10)
        
        // register new user
        const data = new authDetails({...req.body,password:hashPass})
        await data.save()
        res.status(201).json(data)
    }
    catch(err){
        res.status(400).json(err.message)
        console.log(err.message)
    }
}

const signIn = async(req,res)=>{
    const {email,password}  = req.body

    try{
        //  verify email
        const user = await authDetails.findOne({email})
        if(!user) return res.send('invalid email id')

        // verify password
        const pass = await bcrypt.compare(password,user.password)
        if(!pass) return res.send('Wrong credentials!')

        // Assign token to the user
        if(user && pass){
            const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},jwt_secret)
            const {password, ...others} = user._doc
            res.json({'data': others,'token':token,'status':'success'})
        }

    }
    catch(err){
        res.status(400).json(err.message)
        console.log(err.message)
    }
     
}

const deleteUser = async(req,res)=>{
    const id = req.params.id
    try{
        const user = await authDetails.findByIdAndDelete(id)
        res.status(200).send('User has been deleted!!')
    }catch(err){
        res.status(400).json(err.message)
    }
}

const getAllUser =async(req,res)=>{
    try{
        const user = await authDetails.find()
        // const {password,...others} = user._doc
        res.status(200).json(user)
    }
    catch(err){
        res.status(400).json(err.message)
        console.log(err.message)
    }
}

const getUserById =async(req,res)=>{
    const id = req.params.id
    try{
        const user = await authDetails.findById(id)
        res.status(200).json(user)
    }
    catch(err){
        res.status(400).json(err.message)
        console.log(err.message)
    }
}

module.exports = {signUp,signIn,deleteUser,getAllUser,getUserById}