var express = require("express"),
    //Campground = require("../models/campground"),
    //Comment = require("../models/comment"),
    User = require("../models/user"),
    passport = require("passport"),
    router = express.Router()


router.get("/",function(req,res){
   console.log("Welcome to the Homepage!!");
   res.render("campgrounds/home");
   
});


//=============
// Auth Routes
//=============


router.get("/register",function(req,res){
   res.render("register"); 
});


router.post("/register",function(req, res) {
    //res.send("Post called!!");
    
    var newUser = new User({username:req.body.username});
    var newPassword = req.body.password;
    User.register(newUser,newPassword,function(err,user){
        if(err)
        {
            console.log(err);
            return res.render("/register");
        }
        passport.authenticate("local")(req,res,function(){
           res.redirect("/campgrounds"); 
        });
    });

});

//====================
// Login ROUTES
//====================


router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req,res){
    //res.send("Called post ");
});


router.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})

// function isLoggedin(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }


module.exports = router;