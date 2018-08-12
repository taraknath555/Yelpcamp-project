var express=require("express");
var router=express.Router()
var middleware=require("../middleware")
var User=require("../models/users")

router.get("/:id",middleware.isLoggedIn,function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            req.flash("error",err.message)
            res.redirect("/campgrounds")
        }else{
            res.render("./user/show",{user:user})
        }
    })
})

module.exports=router;
