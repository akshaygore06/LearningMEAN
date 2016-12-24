var express = require("express"),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    passport = require("passport"),
    router = express.Router()
////// =============

///// Comment routes

///// ==============


router.get("/new", isLoggedin, function(req, res) {
 
 //find campground by id
 
 Campground.findById(req.params.id, function(err,campground){
   if(err)
   {
       console.log(err);
   }
   else
   {
       res.render("comments/new",{campground:campground}) ;
   }
 });
 
});



router.post("/",isLoggedin,function(req,res){
   
   // lookuo campground id
   Campground.findById(req.params.id, function(err,campground){
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            Comment.create(req.body.comment,function(err,comment){
               if(err)
               {
                   console.log(err);
               }
               else
               {
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect('/campgrounds/' + campground._id);
               }
            });
        }
   } ) ;
  
   //add comment
   //redirect to show
});


function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = router;