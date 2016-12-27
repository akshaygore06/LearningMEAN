var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};


middlewareObj.checkCommentOwnership = function(
    req,res,next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if(err)
            {
                req.flash("err", err.message );
                res.redirect("/campgrounds");
            }
            else{
                    if(comment.author.id.equals(req.user._id)){
                      // return next();
                      next();
                    }
                    else
                    {
                        req.flash("error", "You dont have the permission!!!" );
                         res.redirect("back");
                    }
                }
        });
        
    }
    else
    {
        req.flash("error", "Youy need to log in!!!" );
        res.redirect("back");
    }
}


middlewareObj.checkCampgroundOwnership = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id, function(err, campground) {
            if(err)
            {
                res.redirect("/campgrounds");
            }
            else{
                    if(campground.author.id.equals(req.user._id)){
                      // return next();
                      
                      next();
                    }
                    else
                    {
                        req.flash("error", "You dont have the permission!!" );
                      res.redirect("/campgrounds/"+ req.params.id);
                    }
                }
        });
        
    }
    else
    {
        req.flash("error", "You need to Log in First!!" );
        res.redirect("back");
    }
}



middlewareObj.isLoggedin = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Log In First!" );
    res.redirect("/login");
}



module.exports = middlewareObj; 

