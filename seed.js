var mongoose=require("mongoose"),
    Campground=require("./models/campground"),
    Comment=require("./models/comment"),
    addCamps=[
        {
            title: "morning camp",
            image: "https://farm1.staticflickr.com/977/27386246527_604f2f7226.jpg",
            discription: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution ",
            user:{
                username:"Bikash Gupta"
            }
        },
        {
            title: "Girraween camping",
            image: "https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg",
            discription:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,",
            user:{
                username:"Bikash Gupta"
            }
        },
        {
             title: "scout camp",
             image: "https://farm9.staticflickr.com/8035/7930442194_40e37f5ea0.jpg",
             discription:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum,",
             user:{
                username:"Bikash Gupta"
            }
        },
        {
            title: "Pararaha campsite",
            image: "https://farm7.staticflickr.com/6139/5963108558_5f3ff43fef.jpg",
            discription:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            user:{
                username:"Bikash Gupta"
            }
        }
    ];
    
function removeComment(){
    Comment.remove({},function(err){
        if(err){
            console.log(err)
        }else{
            console.log("All comments are removed!")
        }
    })
}
function seedComment(campground){
    Comment.create({
        user:{
            username:"Bikash Gupta"
        },
        content:"This place very awesome,i really love this place!!"
    },function(err,comment){
        if(err){
            console.log(err)
        }else{
            campground.comments.push(comment)
            campground.save();
            console.log("New comment is created!")
        }
    })
}
    
function seedData(){
    Campground.find({},function(err,foundCampgrounds){
        if(err){
            console.log(err);
        }else{
            Campground.remove({},function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("All campgrounds are removed!");
                    removeComment();
                    addCamps.forEach(function(camp){
                        Campground.create(camp,function(err,addedCamp){
                            if(err){
                                console.log(err);
                            }else{
                                console.log("Campground is added!");
                                seedComment(addedCamp)
                            }
                        });
                    });
                }
            });
        }
    });
}

module.exports=seedData;