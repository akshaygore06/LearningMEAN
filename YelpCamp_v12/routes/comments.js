var express = require("express"),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    passport = require("passport"),
    middleware = require("../middleware"),
    router = express.Router({mergeParams: true})


//Comments new

router.get("/new", middleware.isLoggedin, function(req, res) {

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



router.post("/",middleware.isLoggedin,function(req,res){

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
                  req.flash("error", err.message );
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
                  req.flash("success", "Comment created successfully!!" );
                  res.redirect('/campgrounds/' + campground._id);
              }
            });
        }
  } ) ;
});


// Edit Comments

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    
      Comment.findById(req.params.comment_id, function(err,foundComment){
          if(err)
          {
              req.flash("error", err.message);
              res.redirect("back");
          }
          else
          {
              
             res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});    
      
          }
      }) ;
            
    
});
    
    //COMMENTS UPDATE
    
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    
      Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,foundComment){
          if(err)
          {
              req.flash("error", err.message );
              res.redirect("back");
          }
          else
          {
              req.flash("success", "Comment edited successfully!!" );
            res.redirect("/campgrounds/"+ req.params.id);    
      
          }
      }) ;
            
    
});
    
    
// DESTROY COMMENT

router.delete("/:comment_id/", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err,comment){
            req.flash("success", "Comment Deleted successfully!!" );
          res.redirect("/campgrounds/"+ req.params.id);
      
  }) ;
});




module.exports = router;





