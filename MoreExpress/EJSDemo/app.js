var express = require("express");
var app = express();


app.get("/",function(req,res){
    res.send("home.ejs");
});

app.get("/fallinlovewith/:thing",function(req,res){
    
    var thing = req.params.thing;
    res.render("love.ejs", {varThing: thing} );
});


app.get("/posts",function(req,res){
    
    var posts = [
        
        {author : "Akshay", title : "my Name is gore"},
        {author :" KK", title : "Puneri!!"},
        {author : "Anup", title : "Destiny"}
        ];
        
    res.render("posts.ejs", {posts: posts} );
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started");  
});