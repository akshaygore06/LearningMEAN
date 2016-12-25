var express = require("express"),
    User = require("../models/user"),
    passport = require("passport"),
    router = express.Router()


router.get("/",function(req,res){
   console.log("Welcome to the Homepage!!");
   res.render("campgrounds/home");
   
});



// Handling New User Logic 

router.get("/register",function(req,res){
   res.render("register"); 
});


router.post("/register",function(req, res) {
    
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

// Handling Login Logic

router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req,res){
});



// Handling Logout Logic

router.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});


module.exports = router;