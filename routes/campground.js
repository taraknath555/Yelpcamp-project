var express=require("express");
var router=express.Router()
var middleware=require("../middleware")
var Campground=require("../models/campground",{mergrParams:true})

//show all campgrounds
router.get("/",function(req,res){
    Campground.find({},function(err,allCampground){
        if(err){
            req.flash("error",err.message)
            res.redirect("/")
        }else{
            res.render("campground/index",{campgrounds:allCampground,currentUser:req.user});
        }
    });
});

//show form to add new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campground/new");
});

//add new campground to the database
router.post("/",middleware.isLoggedIn,function(req,res){
    console.log(req.body.campground)
    Campground.create(req.body.campground,function(err,campground){
        if(err){
            req.flash("error",err.message)
            res.redirect("/campgrounds");
        }else{
            campground.user.id=req.user._id;
            campground.user.username=req.user.username;
            campground.save();
            req.flash("success","campground "+campground.title+" is successfully created!")
            res.redirect("/campgrounds");
        }
    });
});

//show more content about a particilar campground
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            req.flash("error",err.message)
            res.redirect("/campgrounds")
        }else{
            res.render("campground/show",{campground:foundCampground});
        }
    });
});

//show form to edit the campground to its author
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            req.flash("error",err.message)
            res.redirect("/campground")
        }else{
            res.render("campground/edit",{campground:foundCampground})
        }
    });
});

//edit and update campground
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,foundCampground){
        if(err){
            req.flash("error",err.message)
            res.redirect("/campgrounds/"+req.params.id)
        }else{
            console.log(req.body.campground)
            req.flash("success","Campground "+foundCampground.title+ " successfully is updated!")
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
})

//delete particular campground
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err,foundCampground){
        if(err){
            req.flash("error",err.message)
            res.redirect("/campgrounds")
        }else{
            req.flash("success","Campground is successfully Deleted!")
            res.redirect("/campgrounds")
        }
    })
})

module.exports=router
