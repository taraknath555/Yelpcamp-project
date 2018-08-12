var bodyParser=require("body-parser"),
    express=require("express"),
    mongoose=require("mongoose"),
    passport=require("passport"),
    localStratagy=require("passport-local"),
    flash=require("connect-flash"),
    ejs=require("ejs"),
    User=require("./models/users"),
    methodOverride=require("method-override")
    
var campgroundRoute=require("./routes/campground");
var commentRoute=require("./routes/comment");
var userRoute=require("./routes/user");
var indexRoute=require("./routes/index");


//configuration
var app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"))
app.use(flash());
app.use(require("express-session")({
    secret:"This is my first real website!",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error")
    res.locals.success=req.flash("success")
    next();
});
app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comment", commentRoute);
app.use("/user", userRoute);
app.use("/", indexRoute);

var url=process.env.DATABASEURL || "mongodb://localhost/Yelp_camp"
mongoose.connect(url)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStratagy(User.authenticate()));


//starts Yelpcamp server
app.listen(process.env.PORT,process.env.IP,function(req,res){
    console.log("Yelpcamp server is started!");
});