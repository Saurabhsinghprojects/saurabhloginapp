module.exports=(req,res)=>{
    req.session.destroy(()=>{
        redirectUser=false;
        res.redirect('/')
    })
}