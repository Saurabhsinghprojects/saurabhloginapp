const User=require('../models/User')
const jwt = require("jsonwebtoken");
const config=process.env;
module.exports=(req,res,next)=>{
    User.findById(req.session.userId,(error,user)=>{
        
        const token =
    req.body.token || req.query.token || req.session.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    console.log("decoded");
    console.log(decoded)
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
  if(error || !user){
    return res.redirect('/auth/login')
}
        next()
    })
}