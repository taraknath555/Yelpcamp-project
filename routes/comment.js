var express=require("express")
var router=express.Router({mergeParams:true});
var middleware=require("../middleware")
var Campground=require("../models/campground")
var Comment=require("../models/comment")

//show form to add new comment in a particualar campground
router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findOne({_id:req.params.id},function(err,foundCampground){
        if(err){
            req.flash("error",err.message)
            res.redirect("/campgrounds/"+req.params.id)
        }else{
            res.render("comment/new",{campground:foundCampground});
        }
    });
});

//add new comment to a particular campground
router.post("/",middleware.isLoggedIn,function(req,res){
    Campground.findOne({_id:req.params.id},function(err,foundCampground){
        if(err){
            req.flash("error",err.message)
            res.redirect("/campgrounds/"+ req.params.id + "/comment/new");
        }else{
            Comment.create(req.body.comment,function(err,newComment){
                if(err){
                    req.flash("error",err.message)
                    res.redirect("/campgrounds/" + req.params.id + "/comment/new");
                }else{
                    newComment.user.id=req.user._id;
                    newComment.user.username=req.user.username;
                    newComment.save()
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    req.flash("success","Your comment is added successfully!")
                    res.redirect("/campgrounds/"+ req.params.id);
                }
            });
        }
    });
});

//show form to edit comment to its author
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            req.flash("error",err.message)
            res.redirect("campgrounds")
        }else{
            res.render("comment/edit",{comment:foundComment,campground_id:req.params.id})
        }
    })
})

//edit and update the  comment
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundCampground){
       if(err){
           req.flash("error",err.message)
           res.redirect("/campgrounds/"+req.params.id)
       }else{
           req.flash("success","Comment is successfully Updated!")
           res.redirect("/campgrounds/"+req.params.id)
       }
   }) 
})

//delete a particular comment
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            req.flash("error",err.message)
            return res.redirect("/campgrounds/"+req.params.id)
        }
        req.flash("success","Comment is successfully Deleted!")
        res.redirect("/campgrounds/"+req.params.id)
    })
})

module.exports=router;