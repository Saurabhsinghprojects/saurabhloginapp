const User=require('../models/User')
var uniqueValidator=require('mongoose-unique-validator');
const bcrypt= require('bcrypt-nodejs')
module.exports=async(req,res)=>{
    
    // await User.findOneAndUpdate({email:Object.values(req.body)[0]},{role:Object.values(req.body)[1]})
    User.findOne({email:Object.values(req.body)[0]}, (error, user) => {
        if (user) {
            bcrypt.compare(Object.values(req.body)[1], user.password, async (error, same) => {
                if (same) {
                    var salt = bcrypt.genSaltSync(10);
                    
                   
                        var hash = bcrypt.hashSync(Object.values(req.body)[2]);
                        
                    await User.findOneAndUpdate({email:Object.values(req.body)[0]},{password:hash})
                    
                }
                else {
                    res.redirect('/dashboard')
                }
            })
        }
        else {
            res.redirect('/dashboard')
        }
    })
    res.redirect('/dashboard')
}