var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
   name : String,
   age: Number,
   temperament: String
});


var Cat = mongoose.model("Cat", catSchema);

/// add a data

// var santa = new Cat ({
//     name : "Santa",
//     age : 12,
//     temperament:"Khunnas!!" 
// });

// santa.save(function(err,cat){
//     if(err)
//     {
//         console.log("Error Happened!!");
//     }
//     else
//     {
//         console.log("Saved a data to DB!!");
//         console.log(cat);
        
//     }
// })


Cat.create({
    name : "Banta",
    age : 10,
    temperament:"Khatarnaak!!" 
}, function(err,cat){
    if(err)
    {
        console.log("Error Happened!!");
    }
    else
    {
        console.log("Saved a data to DB!!");
        console.log(cat);
        
    }});
    
    Cat.remove({name: "Santa"},function(err,cat){
    if(err)
    {
        console.log("Error Happened!!");
    }
    else
    {
        console.log("Saved a data to DB!!");
        console.log(cat);
        
    }});
    
    
    
    
    Cat.find({},function(err,cats){
    if(err)
    {
        console.log("Error Happened in finding all cats!!");
    }
    else
    {
        console.log("List if all the CATS..........!!!");
        console.log(cats);
        
    }})