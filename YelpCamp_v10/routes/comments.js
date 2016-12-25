var express = require("express"),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    passport = require("passport"),
    router = express.Router({mergeParams: true})


//Comments new

router.get("/new", isLoggedin, function(req, res) {

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
                   //add username and userid of currentUser 
                   console.log(req.user.username);
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect('/campgrounds/' + campground._id);
               }
            });
        }
   } ) ;
});


// Edit Comments

router.get("/:comment_id/edit", checkCommentOwnership, function(req, res) {
    
       Comment.findById(req.params.comment_id, function(err,foundComment){
          if(err)
          {
              res.redirect("back");
          }
          else
          {
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});    
      
          }
       }) ;
            
    
});
    
    //COMMENTS UPDATE
    
router.put("/:comment_id", checkCommentOwnership, function(req, res) {
    
       Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,foundComment){
          if(err)
          {
              res.redirect("back");
          }
          else
          {
            res.redirect("/campgrounds/"+ req.params.id);    
      
          }
       }) ;
            
    
});
    
    
// DESTROY COMMENT

router.delete("/:comment_id/",checkCommentOwnership, function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err,comment){
    
          res.redirect("/campgrounds/"+ req.params.id);
      
  }) ;
});


//middleware
function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



function checkCommentOwnership(req,res,next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if(err)
            {
                res.redirect("/campgrounds");
            }
            else{
                    if(comment.author.id.equals(req.user._id)){
                        return next();
                    }
                    else
                    {
                        return res.redirect("back");
                    }
                }
        });
        
    }
    else
    {
        res.redirect("back");
    }
}






module.exports = router;