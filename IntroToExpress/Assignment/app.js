var express = require('express');
var app = express();

app.get("/", function(req,res){
    res.send("Hi there, Welcome to my assignment!");
});

app.get("/speak/:animal", function(req,res){
    
    var sounds = {
        
        pig: "Oink",
        cow: "Mow",
        dog: "Woof Woof!!"
    }
    
    var animal = req.params.animal;
    var sound = sounds[animal];
    
    res.send("The "+ animal + " says '"+ sound + "'" );
});


app.get("/repeat/:hello/:number", function(req,res){
    
    var number = req.params.number;
    var msg = req.params.hello;
    
    var string = "";
    
    for(var i  = 0; i < number; i++)
    {
        string += msg;
        string += " ";
    }
    
    app.get("*", function(req, res){
   res.send("Sorry, page not found...What are you doing with your life?");
});
    
    res.send(string);
    
});





app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server has Started!!!");
});