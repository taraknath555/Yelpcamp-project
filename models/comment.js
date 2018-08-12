var mongoose=require("mongoose");
var commentSchema=new mongoose.Schema({
    user:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    content:String,
    created:{type:Date,default:Date.now}
});
var Comment=mongoose.model("Comment",commentSchema);
module.exports=Comment;