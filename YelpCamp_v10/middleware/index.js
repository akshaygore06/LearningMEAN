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
                res.redirect("/campgrounds");
            }
            else{
                    if(comment.author.id.equals(req.user._id)){
                      // return next();
                      next();
                    }
                    else
                    {
                         res.redirect("back");
                    }
                }
        });
        
    }
    else
    {
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
                      res.redirect("back");
                    }
                }
        });
        
    }
    else
    {
        res.redirect("back");
    }
}



middlewareObj.isLoggedin = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = middlewareObj; 

