var express = require('express');
var app = express();

app.get("/", function(req,res){
    res.send("Hi There...Wassup!!!");
});


app.get("/bye", function(req,res){
    res.send("GOOD BYE!!!");
});

app.get("/dogs", function(req,res){
    res.send("MEOW!!!!");
});

app.get("*", function(req,res){             // Must be at the end
    res.send("Unkown page...!!!!");
});


app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server has Started!!!");
});

