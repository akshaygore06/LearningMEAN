var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSantizer = require("express-sanitizer");
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSantizer());
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));


var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restful_blog_app");

//Mongoose config /model SETUP

var blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    body : String,
    created : { type:Date, default:Date.now}
    });

var Blog = mongoose.model("Blog",blogSchema);


//  Blog.create({
//      title : "Test Entry",
//      image : "http://unsplash.com/?photo=mk2USqDQE5E",
//      body : "3rd entry...!!!"
    
//  },function(err,blog){
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log(blog);
//     }
// });



// RESTFUL ROUTES

 app.get("/",function(req,res){
     
     
   res.redirect("/blogs");

 })

//INDEX ROUTE

 app.get("/blogs",function(req,res){
   //  res.send("Welcome to home Page");
   
   Blog.find({},function(err,blogs){
         if(err)
         {
          console.log(err);
         }
         else
         {
            res.render("index",{blogs:blogs});     
         }
     });
   
 });
// NEW 

app.get("/blogs/new",function(req,res){
   res.render("new");
 });


app.get("/blogs/:id",function(req,res){
    
    // res.send("Show page");
    
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err)
        {
            res.redirect("/blogs");
        }
        else
        {
           res.render("show",{blog: foundBlog}); 
        }
    });
    
    
});

/// EDIT ROUTE

app.get("/blogs/:id/edit",function(req, res) {
   
   Blog.findById(req.params.id, function(err,foundBlog){
       if(err)
       {
           res.redirect("/blogs");
       }
       else{
           res.render("edit",{blog: foundBlog});
       }
   });
});

//UPDATE ROUTE


app.put("/blogs/:id",function(req,res){
    req.body.blog.body = req.sanitizer(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
      if(err)
      {
          res.redirect("/blogs");
      }
      else{
          res.redirect("/blogs/" + req.params.id);
      }
       
   });
   
});


// DELETE ROUTE

app.delete("/blogs/:id", function(req,res){
   //res.send("Delete requested");
   Blog.findByIdAndRemove(req.params.id, function(err,removedBlog){
       if(err)
       {
           res.redirect("/blogs");
       }
       else
       {
           res.redirect("/blogs");
       }
       
   });
});





//CREATE ROUTE

app.post("/blogs",function(req,res){
   // create blog
   
  
   
   Blog.create(req.body.blog,function(err,newBLOG){
       
       if(err)
       {
           res.render("new");
       }
       else
       {
            res.redirect("/blogs");
       }
       
   });
   
 });


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started");
});
