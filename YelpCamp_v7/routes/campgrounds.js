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

router.post("/",function(req,res){
   //res.send("You hit the post route");
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var newCampground = {name:name, image:image, description:description}
   Campground.create(newCampground, function(err,campground){
    if(err)
    {
        console.log("Error in creating Campground entry!!");
    }
    else
    {
        console.log("Saved a data to DB!!");
        //console.log(campground);
          res.redirect("/campgrounds");
    }});
   
 
});


router.get("/new",function(req, res) {
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

//middleware
function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = router;