var express = require("express"),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    passport = require("passport"),
    router = express.Router()

router.get("/",function(req,res){
   console.log("Welcome to the Campground Page!!");
   
   Campground.find({},function(err,allcampgrounds){
      if(err)
      {
          console.log("ERROR");
      }
      else{
          res.render("campgrounds/index",{campgrounds:allcampgrounds});
      }
       
   });
});

router.post("/", isLoggedin, function(req,res){
   //res.send("You hit the post route");
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description
   var author = {
       id: req.user._id,
       username : req.user.username
   }
   
   var newCampground = {name:name, image:image, description:description, author:author}
  
  
   Campground.create(newCampground, function(err,campground){
    if(err)
    {
        console.log("Error in creating Campground entry!!");
    }
    else
    {
        console.log("Saved a data to DB!!");
       // console.log(campground);
          res.redirect("/campgrounds");
    }});
   
 
});


router.get("/new",isLoggedin,function(req, res) {
   res.render("campgrounds/new"); 
});


// SHOW - Show more info about the campground


router.get("/:id",function(req, res) {
   
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
     if(err)
     {
         console.log(err);
     }
     else
     {
        res.render("campgrounds/show",{campground:foundCampground});    
     }
  });
});


router.get("/:id/edit", checkCampgroundOwnership, function(req,res){
   
       Campground.findById(req.params.id,function(err,campground){
               res.render("campgrounds/edit", {campground:campground});    
            
        });
    
});

//update

router.put("/:id", checkCampgroundOwnership,function(req,res){
  
     Campground.findByIdAndUpdate(req.params.id,req.body.campground, function (err,updatedCampground){
       if(err)
       {
           res.redirect("/campgrounds");
       }
       else
       {
           res.redirect("/campgrounds/"+ req.params.id);
       }
   }); 
});


// Delete Campgrounds

router.delete("/:id", checkCampgroundOwnership,function(req, res) {
    
    console.log("User requested for Delete is :" + req.user);
    
    // find and delete
    Campground.findByIdAndRemove(req.params.id,function(err,removedCampground){
       if(err)
       {
           res.redirect("/"+req.params.id);
       }
       else
       {
           res.redirect("/campgrounds");
       }
    });
   
});





//middleware
function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req,res,next)
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