const User=require('../models/User')
var uniqueValidator=require('mongoose-unique-validator');
const bcrypt= require('bcrypt-nodejs')
module.exports=async(req,res)=>{
    
    await User.findByIdAndUpdate(req.session.userId,{mobileno : Object.values(req.body)[1]})

    await User.findByIdAndUpdate(req.session.userId,{username : Object.values(req.body)[0]})
 
    res.redirect('/dashboard')
}