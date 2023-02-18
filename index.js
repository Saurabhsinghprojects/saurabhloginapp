const express = require('express')
const app = new express()
app.use(express.static('public'))
const fs = require('fs')
const ejs = require('ejs')
app.set('view engine', 'ejs')

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config.env" });
}

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });


var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const fileUpload = require('express-fileupload')
app.use(fileUpload())



const validateMiddleWare = require("./middleware/validationMiddleware")
app.use('/posts/store', validateMiddleWare)

const expressSession = require('express-session');
app.use(expressSession({
  secret: 'keyboard cat'
}))

const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')



global.loggedIn = null;
global.recentBlogs = null;
global.redirectUser = false;
global.redirectPost = null;
global.enquireRedirect = null;

app.use("*", async (req, res, next) => {
  loggedIn = req.session.userId;


  next()
});

const flash = require('connect-flash')
app.use(flash());

let port=process.env.PORT;
if(port==null || port==""){
  port=4000;
}
app.listen(port, () => {
  console.log('App listening')
})

const loginController = require('./controllers/login')
app.get('/', loginController)

const newUserController = require('./controllers/newUser')
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

const storeUserController = require('./controllers/storeUser')
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)


app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

const loginUserController = require('./controllers/loginUser')
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)

const logoutController = require('./controllers/logout')
app.get('/auth/logout', logoutController)


const dashboardController = require('./controllers/dashboard')
app.get('/dashboard',authMiddleware, dashboardController)



/*  PASSPORT SETUP  */

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());



app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

//update user
const updateuserController = require('./controllers/updateuser')
app.post('/update/user',updateuserController)

//change password
const changepasswordController = require('./controllers/changepassword')
app.post('/password/change',changepasswordController)





app.use((req, res) => res.render('notfound'));