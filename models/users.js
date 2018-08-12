var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
var userSchema=new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    coverpic:String,
    profilepic:String,
    password:String,
    confirmPassword:String,
    email:String,
    aboutyou:String,
    gender:String,
    terms:String,
});
userSchema.plugin(passportLocalMongoose);
var User=mongoose.model("User",userSchema);
module.exports=User;