const User = require('../models/User.js')
const path = require('path')
const jwt = require("jsonwebtoken");
module.exports = (req, res) => {
    
    console.log(Object.values(req.body)[0])
    let err="false";
    
    if(Object.values(req.body)[0]==''){
        req.flash('validationErrors', "Please provide fill in your Name")
                req.flash('data', req.body)
                err="true"
                // return res.redirect('/auth/register')
    }
    if(Object.values(req.body)[1]==''){
        req.flash('validationErrors', "Please provide fill in your E-mail")
                req.flash('data', req.body)
                err="true"
                
    }
    if(Object.values(req.body)[2]==''){
        req.flash('validationErrors', "Please fill in a password ")
        req.flash('data', req.body)
                err="true"
                
    }
    if(Object.values(req.body)[3]==''){
        req.flash('validationErrors', "Please fill in your mobileno")
                req.flash('data', req.body)
                err="true"
                
    }

    if(err=="true"){
       
        return res.redirect('/auth/register')
    }
    const { email } = req.body;
    const user =User.create({
            ...req.body
        }, async ()=>{
            const token = await jwt.sign(
                { user_id: req.session.userId, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
                req.session.token=token;
              await User.findByIdAndUpdate(req.session.userId,{token : token})
            
              
        }
        )

    
        
        res.redirect('/auth/login')
}