var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var Campground = require("./models/campground");
var seedDB = require("./seeds");


var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
seedDB();





app.get("/",function(req,res){
   console.log("Welcome to the Homepage!!");
   res.render("home");
   
});

app.get("/campgrounds",function(req,res){
   console.log("Welcome to the Campground Page!!");
   
   Campground.find({},function(err,allcampgrounds){
      if(err)
      {
          console.log("ERROR");
      }
      else{
          res.render("index",{campgrounds:allcampgrounds});
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
   res.render("new"); 
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
        res.render("show",{campground:foundCampground});    
     }
  });
});



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started");  
});