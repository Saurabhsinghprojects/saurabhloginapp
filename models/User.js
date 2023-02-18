const mongoose= require('mongoose')
const Schema=mongoose.Schema;
var uniqueValidator=require('mongoose-unique-validator');
const bcrypt= require('bcrypt-nodejs')

const UserSchema= new Schema({
    username:{
      type: String
    },
    password:{
        type: String

    },
    email:{
        type: String,
        unique: true
    },
    mobileno:{
        type:Number
    },
    token: { type: String },
});
var salt = bcrypt.genSaltSync(10);
UserSchema.plugin(uniqueValidator);
UserSchema.pre('save',function(next){
    const user=this
    
    var hash = bcrypt.hashSync(user.password);
    user.password= hash;
        next()
})

const User= mongoose.model('User',UserSchema);
module.exports= User