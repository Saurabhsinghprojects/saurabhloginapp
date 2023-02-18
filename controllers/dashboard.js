const User=require('../models/User')

module.exports=async(req,res)=>{
    
    const user= await User.findById(req.session.userId);
    console.log(user);
    req.session.userId=user._id
    res.render('dashboard',{user});
}