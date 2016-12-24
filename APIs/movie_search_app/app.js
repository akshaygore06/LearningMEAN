var express = require("express");
var app = express();
var request = require("request");
app.set("view engine","ejs");

app.get("/",function(req,res){
  res.render("search");
});


app.get("/results",function(req,res){
  var query = req.query.search;
  
  request("http://www.omdbapi.com/?s="+query,function(error,responce,body){
      if(!error && responce.statusCode == 200)
      {
        var parsedData = JSON.parse(body);
        res.render("results", { parsedData : parsedData } );
      }
     
  });
});

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Movie app has Started!!!");
});