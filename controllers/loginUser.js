const bcrypt = require('bcrypt-nodejs')
const User = require('../models/User')
const jwt = require("jsonwebtoken");
module.exports = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, async (error, same) => {
                if (same) {
                    req.session.userId = await user._id
                    
                    const token =await jwt.sign(
                        { user_id: req.session.userId, email },
                        process.env.TOKEN_KEY,
                        {
                          expiresIn: "2h",
                        }
                      );
                      
                      req.session.token=token;
                      await User.findByIdAndUpdate(req.session.userId,{token : token})
                    //   user.token = token;
                        res.redirect('/dashboard')
                }
                else {
                    res.redirect('/auth/login')
                }
            })
        }
        else {
            res.redirect('/auth/login')
        }
    })
}