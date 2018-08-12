var Campground=require("../models/campground")
var Comment=require("../models/comment")

var middlewareobj={};
middlewareobj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be Logged In first!")
    res.redirect("/login")
}
middlewareobj.checkCampgroundOwnership=function(req,res,next){
    if(!req.isAuthenticated()){
        req.flash("error","You need to be Logged In to do that!")
        return res.redirect("/login")
    }
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            req.flash("error",err.message)
            res.redirect("back")
        }else{
            if(foundCampground.user.id.equals(req.user._id)){
                return next();
            }
            req.flash("error","You don't have permission to do that!")
            res.redirect("back")
        }
    })
}

middlewareobj.checkCommentOwnership=function(req,res,next){
    if(!req.isAuthenticated()){
        req.flash("error","You need to be Logged In to do that!")
        return res.redirect("/login")
    }
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            req.flash("error",err.message)
            res.redirect("/campgrounds/"+req.params.id)
        }
        else{
            if(foundComment.user.id.equals(req.user._id)){
                return next();
            }
            req.flash("error","You don't have permission to do that!")
            res.redirect("back")
        }
    });
};

module.exports=middlewareobj;