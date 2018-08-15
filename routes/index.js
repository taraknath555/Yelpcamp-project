var express=require("express");
var router=express.Router();
var User=require("../models/users")
var passport=require("passport")

//show landing page
router.get("/",function(req,res){
    res.render("landing");
});

//=========================
//Auth Route
//=========================

//show form to sign up
router.get("/register",function(req,res){
    res.render("register");
})

//handle new user registration
router.post("/register",function(req,res){
    var userInfo=req.body.user;
    User.register(userInfo,req.body.password,function(err,newUser){
        if(err){
            req.flash("error",err.message)
            return res.redirect("/register");
        }
        User.authenticate("local")(req,res,function(){
            req.flash("success","You are successfully Register to Yelpcamp " + userInfo.username)
            res.redirect("/campgrounds");
        });
    });
});

//show form to login existing user
router.get("/login",function(req,res){
    res.render("login")
})

//handle existing user login
router.post("/login",passport.authenticate("local",{
    successRedirect:"/loginSuccess",
    failureRedirect:"/loginFailed"
}),function(req,res){
    
})
router.get("/loginSuccess",function(req,res){
    req.flash("success","Welcome back to the Yelpcamp " + req.user.username)
    res.redirect("/campgrounds")
});

router.get("/loginFailed",function(req,res){
    if(!req.user){
        req.flash("error","Check your username or password!")
        res.redirect("/login")
    }
})

//handle logout functionality of users
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","You Logged Out Successfully!")
    res.redirect("/campgrounds")
})

module.exports=router;
