var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");


var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
seedDB();





app.get("/",function(req,res){
   console.log("Welcome to the Homepage!!");
   res.render("campgrounds/home");
   
});

app.get("/campgrounds",function(req,res){
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
 
   
 //  res.render("campground",{campgrounds:campgrounds});
   
});

app.post("/campgrounds",function(req,res){
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


app.get("/campgrounds/new",function(req, res) {
   res.render("campgrounds/new"); 
});


// SHOW - Show more info about the campground


app.get("/campgrounds/:id",function(req, res) {
   
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



////// =============

// Comment routes

//==================


app.get("/campgrounds/:id/comments/new",function(req, res) {
 
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



app.post("/campgrounds/:id/comments",function(req,res){
   
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



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started");  
});