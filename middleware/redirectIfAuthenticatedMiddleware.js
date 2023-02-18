

const config = process.env;
module.exports=(req,res,next)=>{
    
    if(req.session.userId){
        return res.redirect('/')
    }
    next()
}